import { OrderDTO } from '../dtos/OrderDTO';
import { Order } from '@/domain/entities/Order';
import { OrderRepository } from '@/domain/repositories/OrderRepository';
import { User } from '@/domain/entities/User';
import { PartRepository } from '@/domain/repositories/PartRepository';
import { PaymentService } from '@/application/services/PaymentService';
import { EscrowService } from '@/infrastructure/payment/EscrowService';
import { OrderStatus } from '@/shared/types/order.types';
import { OrderStatus as OrderStatusEnum } from '@prisma/client';
import { OrderPaymentStatus } from '@/shared/types/order.types';
import { PaymentStatus } from '@prisma/client';
import { DeliveryStatus } from '@prisma/client';
import { NotificationService } from '@/infrastructure/notifications/NotificationService';
import { NotificationType } from '@prisma/client';
import { UserRoles } from '@prisma/client';

export class PlaceOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private partRepository: PartRepository,
    private paymentService: PaymentService,
    private escrowService: EscrowService,
    private notificationService: NotificationService
  ) {}

  async execute(orderDTO: OrderDTO, user: User): Promise<Order> {
    // 1. Validate part availability
    const part = await this.partRepository.findById(orderDTO.partId);
    if (!part) {
      throw new Error('Part not found');
    }

    if (part.stock < orderDTO.quantity) {
      throw new Error('Not enough stock');
    }

    // 2. Create order
    const order = Order.create(
      user.id,
      part.id,
      orderDTO.quantity,
      part.price,
      orderDTO.shippingAddress
    );

    // 3. Process payment
    const paymentResult = await this.paymentService.processPayment(
      user,
      part.price,
      orderDTO.paymentMethod
    );

    // 4. Handle escrow
    if (paymentResult.status === 'PAID') {
      if (user.role === UserRoles.MERCHANT || user.role === UserRoles.SUPPLIER) {
        // For B2B: release payment immediately
        order.paymentStatus = OrderPaymentStatus.PAID;
        order.status = OrderStatus.PROCESSING;
      } else {
        // For B2C: hold payment in escrow
        order.paymentStatus = OrderPaymentStatus.ESCROW_HOLD;
        order.status = OrderStatus.PENDING;
        await this.escrowService.holdPayment(order.id, part.price);
      }
    } else {
      throw new Error('Payment failed');
    }

    // 5. Save order
    const createdOrder = await this.orderRepository.create(order);

    // 6. Notify merchant/supplier
    await this.notificationService.send(
      createdOrder.merchantId || createdOrder.supplierId,
      NotificationType.ORDER,
      'New order received',
      `You have a new order #${createdOrder.id}`,
      {
        orderId: createdOrder.id,
        partId: createdOrder.partId,
        quantity: createdOrder.quantity,
      }
    );

    return createdOrder;
  }
}
