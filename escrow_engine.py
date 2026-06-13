"""
BASQOR - ESCROW & DIGITAL WALLET ENGINE
VERSION: 2.0.0-JEDDAH
PROTECTS CUSTOMER & MERCHANT FUNDS
"""

import os
import hashlib
import hmac
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
from enum import Enum
from dotenv import load_dotenv

load_dotenv('config.env')


class TransactionStatus(Enum):
    PENDING_PAYMENT = "PENDING_PAYMENT"
    PAYMENT_RECEIVED = "PAYMENT_RECEIVED"
    HELD_IN_ESCROW = "HELD_IN_ESCROW"
    ASSIGNED_TO_MANDOUB = "ASSIGNED_TO_MANDOUB"
    PICKED_UP = "PICKED_UP"
    IN_TRANSIT = "IN_TRANSIT"
    DELIVERED = "DELIVERED"
    AWAITING_INSTALLATION = "AWAITING_INSTALLATION"
    INSTALLATION_VERIFIED = "INSTALLATION_VERIFIED"
    RELEASED_TO_MERCHANT = "RELEASED_TO_MERCHANT"
    COMPLETED = "COMPLETED"
    DISPUTED = "DISPUTED"
    REFUNDED = "REFUNDED"
    CANCELLED = "CANCELLED"


class DisputeReason(Enum):
    PART_NOT_COMPATIBLE = "PART_NOT_COMPATIBLE"
    PART_DAMAGED = "PART_DAMAGED"
    PART_NOT_AS_DESCRIBED = "PART_NOT_AS_DESCRIBED"
    DELIVERY_DELAYED = "DELIVERY_DELAYED"
    WRONG_PART_DELIVERED = "WRONG_PART_DELIVERED"
    OTHER = "OTHER"


class BasqorEscrowEngine:
    """
    محرك الحساب الوسيط والمحفظة الرقمية
    يحمي العميل والتاجر معاً في جميع مراحل المعاملة
    """

    def __init__(self):
        self.escrow_hold_days = int(os.getenv('ESCROW_HOLD_PERIOD_DAYS', 3))
        self.auto_release_hours = int(os.getenv('ESCROW_AUTO_RELEASE_HOURS', 72))
        self.max_escrow_amount = float(os.getenv('MAX_ESCROW_AMOUNT_SAR', 50000))
        self.encryption_key = os.getenv('ENCRYPTION_KEY', 'basqor-secure-key-2026')
        self._transactions: Dict[str, Dict] = {}
        self._wallets: Dict[str, float] = {}
        self._disputes: Dict[str, Dict] = {}
        self._installation_pins: Dict[str, str] = {}

    # ==========================================
    # 1. بدء المعاملة - استلام الدفع
    # ==========================================

    def initiate_transaction(
        self,
        customer_id: str,
        merchant_id: str,
        amount: float,
        part_type: str,
        order_type: str
    ) -> Dict:
        """
        بدء معاملة جديدة: العميل يدفع، المبلغ يعلق في الحساب الوسيط
        """
        if amount > self.max_escrow_amount:
            return {"success": False, "error": f"المبلغ يتجاوز الحد الأقصى ({self.max_escrow_amount} ريال)"}

        order_id = self._generate_order_id()
        installation_pin = self._generate_installation_pin(order_id)

        transaction = {
            "order_id": order_id,
            "customer_id": customer_id,
            "merchant_id": merchant_id,
            "mandoub_id": None,
            "amount": amount,
            "part_type": part_type,
            "order_type": order_type,
            "status": TransactionStatus.PAYMENT_RECEIVED.value,
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat(),
            "escrow_hold_until": (datetime.now() + timedelta(days=self.escrow_hold_days)).isoformat(),
            "auto_release_at": (datetime.now() + timedelta(hours=self.auto_release_hours)).isoformat(),
            "installation_pin_hash": self._hash_pin(installation_pin),
            "timeline": [
                {
                    "status": TransactionStatus.PAYMENT_RECEIVED.value,
                    "timestamp": datetime.now().isoformat(),
                    "note": "تم استلام الدفع وتعليقه في الحساب الوسيط"
                }
            ]
        }

        self._transactions[order_id] = transaction
        self._installation_pins[order_id] = installation_pin

        return {
            "success": True,
            "order_id": order_id,
            "installation_pin": installation_pin,
            "status": TransactionStatus.HELD_IN_ESCROW.value,
            "message": "تم تعليق المبلغ في الحساب الوسيط. سيحرر بعد تأكيد التركيب."
        }

    # ==========================================
    # 2. تتبع مراحل التوصيل
    # ==========================================

    def assign_mandoub(self, order_id: str, mandoub_id: str) -> Dict:
        """تعيين مندوب للطلب"""
        tx = self._get_transaction(order_id)
        if not tx:
            return {"success": False, "error": "الطلب غير موجود"}

        tx["mandoub_id"] = mandoub_id
        tx["status"] = TransactionStatus.ASSIGNED_TO_MANDOUB.value
        tx["updated_at"] = datetime.now().isoformat()
        tx["timeline"].append({
            "status": TransactionStatus.ASSIGNED_TO_MANDOUB.value,
            "timestamp": datetime.now().isoformat(),
            "note": f"تم تعيين المندوب {mandoub_id}"
        })

        return {"success": True, "order_id": order_id, "status": tx["status"]}

    def confirm_pickup(self, order_id: str, mandoub_id: str) -> Dict:
        """تأكيد استلام المندوب للقطعة"""
        tx = self._get_transaction(order_id)
        if not tx:
            return {"success": False, "error": "الطلب غير موجود"}

        if tx["mandoub_id"] != mandoub_id:
            return {"success": False, "error": "المندوب غير مصرح له"}

        tx["status"] = TransactionStatus.PICKED_UP.value
        tx["updated_at"] = datetime.now().isoformat()
        tx["timeline"].append({
            "status": TransactionStatus.PICKED_UP.value,
            "timestamp": datetime.now().isoformat(),
            "note": "تم استلام القطعة من التاجر"
        })

        return {"success": True, "order_id": order_id, "status": tx["status"]}

    def confirm_delivery(self, order_id: str, mandoub_id: str) -> Dict:
        """تأكيد تسليم القطعة للعميل"""
        tx = self._get_transaction(order_id)
        if not tx:
            return {"success": False, "error": "الطلب غير موجود"}

        tx["status"] = TransactionStatus.DELIVERED.value
        tx["updated_at"] = datetime.now().isoformat()
        tx["timeline"].append({
            "status": TransactionStatus.DELIVERED.value,
            "timestamp": datetime.now().isoformat(),
            "note": "تم تسليم القطعة للعميل"
        })

        return {"success": True, "order_id": order_id, "status": tx["status"]}

    # ==========================================
    # 3. تأكيد التركيب وتحرير المبلغ
    # ==========================================

    def verify_installation(self, order_id: str, pin: str, workshop_id: str) -> Dict:
        """
        تأكيد تركيب القطعة - تحرير المبلغ للتاجر
        Two-Step Verification
        """
        tx = self._get_transaction(order_id)
        if not tx:
            return {"success": False, "error": "الطلب غير موجود"}

        expected_pin = self._installation_pins.get(order_id)
        if not expected_pin:
            return {"success": False, "error": "لا يوجد رمز تأكيد لهذا الطلب"}

        if not hmac.compare_digest(self._hash_pin(pin), tx["installation_pin_hash"]):
            return {"success": False, "error": "رمز التأكيد غير صحيح"}

        tx["status"] = TransactionStatus.INSTALLATION_VERIFIED.value
        tx["updated_at"] = datetime.now().isoformat()
        tx["verified_by_workshop"] = workshop_id
        tx["timeline"].append({
            "status": TransactionStatus.INSTALLATION_VERIFIED.value,
            "timestamp": datetime.now().isoformat(),
            "note": f"تم تأكيد التركيب بواسطة ورشة {workshop_id}"
        })

        return self._release_funds(order_id)

    def _release_funds(self, order_id: str) -> Dict:
        """تحرير المبلغ للتاجر"""
        tx = self._get_transaction(order_id)
        if not tx:
            return {"success": False, "error": "الطلب غير موجود"}

        tx["status"] = TransactionStatus.RELEASED_TO_MERCHANT.value
        tx["released_at"] = datetime.now().isoformat()
        tx["updated_at"] = datetime.now().isoformat()
        tx["timeline"].append({
            "status": TransactionStatus.RELEASED_TO_MERCHANT.value,
            "timestamp": datetime.now().isoformat(),
            "note": "تم تحرير المبلغ للتاجر"
        })

        return {
            "success": True,
            "order_id": order_id,
            "status": TransactionStatus.RELEASED_TO_MERCHANT.value,
            "message": "تم تحرير المبلغ للتاجر بنجاح"
        }

    def auto_release_if_expired(self, order_id: str) -> Dict:
        """تحرير تلقائي بعد انتهاء مدة الاعتراض"""
        tx = self._get_transaction(order_id)
        if not tx:
            return {"success": False, "error": "الطلب غير موجود"}

        if tx["status"] != TransactionStatus.DELIVERED.value:
            return {"success": False, "error": "لم يتم التسليم بعد"}

        if datetime.now() < datetime.fromisoformat(tx["auto_release_at"]):
            return {"success": False, "error": "لم تنته مدة الانتظار بعد"}

        return self._release_funds(order_id)

    # ==========================================
    # 4. نظام النزاعات
    # ==========================================

    def open_dispute(
        self,
        order_id: str,
        reason: str,
        initiated_by: str,
        description: str = ""
    ) -> Dict:
        """فتح نزاع على معاملة"""
        tx = self._get_transaction(order_id)
        if not tx:
            return {"success": False, "error": "الطلب غير موجود"}

        dispute_id = f"DSP-{order_id}"
        dispute = {
            "dispute_id": dispute_id,
            "order_id": order_id,
            "status": "OPEN",
            "reason": reason,
            "initiated_by": initiated_by,
            "description": description,
            "opened_at": datetime.now().isoformat(),
            "resolution": None
        }

        tx["status"] = TransactionStatus.DISPUTED.value
        tx["updated_at"] = datetime.now().isoformat()
        tx["timeline"].append({
            "status": TransactionStatus.DISPUTED.value,
            "timestamp": datetime.now().isoformat(),
            "note": f"تم فتح نزاع: {reason}"
        })

        self._disputes[dispute_id] = dispute

        return {
            "success": True,
            "dispute_id": dispute_id,
            "order_id": order_id,
            "status": "OPEN",
            "message": "تم فتح النزاع. سيتم مراجعته خلال 24 ساعة."
        }

    def resolve_dispute(self, dispute_id: str, resolution: str, refund_amount: float = 0) -> Dict:
        """حل نزاع"""
        if dispute_id not in self._disputes:
            return {"success": False, "error": "النزاع غير موجود"}

        dispute = self._disputes[dispute_id]
        order_id = dispute["order_id"]
        tx = self._get_transaction(order_id)

        dispute["status"] = "RESOLVED"
        dispute["resolution"] = resolution
        dispute["resolved_at"] = datetime.now().isoformat()
        dispute["refund_amount"] = refund_amount

        if resolution == "REFUND_CUSTOMER":
            tx["status"] = TransactionStatus.REFUNDED.value
            tx["refund_amount"] = refund_amount
            tx["refunded_at"] = datetime.now().isoformat()
        elif resolution == "RELEASE_MERCHANT":
            self._release_funds(order_id)
        elif resolution == "PARTIAL_REFUND":
            tx["status"] = TransactionStatus.REFUNDED.value
            tx["refund_amount"] = refund_amount

        tx["updated_at"] = datetime.now().isoformat()
        tx["timeline"].append({
            "status": tx["status"],
            "timestamp": datetime.now().isoformat(),
            "note": f"حل النزاع: {resolution}"
        })

        return {
            "success": True,
            "dispute_id": dispute_id,
            "resolution": resolution,
            "refund_amount": refund_amount
        }

    # ==========================================
    # 5. المحفظة الرقمية
    # ==========================================

    def get_wallet_balance(self, user_id: str) -> float:
        """الاستعلام عن رصيد المحفظة"""
        return round(self._wallets.get(user_id, 0.0), 2)

    def credit_wallet(self, user_id: str, amount: float, reason: str = "") -> Dict:
        """إيداع مبلغ في المحفظة"""
        if amount <= 0:
            return {"success": False, "error": "المبلغ يجب أن يكون أكبر من صفر"}

        if user_id not in self._wallets:
            self._wallets[user_id] = 0.0

        self._wallets[user_id] += amount

        return {
            "success": True,
            "user_id": user_id,
            "amount": amount,
            "new_balance": round(self._wallets[user_id], 2),
            "reason": reason
        }

    def debit_wallet(self, user_id: str, amount: float, reason: str = "") -> Dict:
        """خصم من المحفظة"""
        balance = self.get_wallet_balance(user_id)

        if amount <= 0:
            return {"success": False, "error": "المبلغ يجب أن يكون أكبر من صفر"}

        if balance < amount:
            return {"success": False, "error": f"رصيد غير كاف. الرصيد الحالي: {balance} ريال"}

        self._wallets[user_id] -= amount

        return {
            "success": True,
            "user_id": user_id,
            "amount": amount,
            "new_balance": round(self._wallets[user_id], 2),
            "reason": reason
        }

    def transfer_between_wallets(
        self,
        from_user: str,
        to_user: str,
        amount: float,
        reason: str = ""
    ) -> Dict:
        """تحويل بين محفظتين"""
        debit_result = self.debit_wallet(from_user, amount, f"تحويل إلى {to_user}: {reason}")
        if not debit_result["success"]:
            return debit_result

        return self.credit_wallet(to_user, amount, f"تحويل من {from_user}: {reason}")

    # ==========================================
    # 6. استعلامات
    # ==========================================

    def get_transaction_status(self, order_id: str) -> Dict:
        """الاستعلام عن حالة معاملة"""
        tx = self._get_transaction(order_id)
        if not tx:
            return {"success": False, "error": "الطلب غير موجود"}

        return {
            "success": True,
            "order_id": order_id,
            "status": tx["status"],
            "amount": tx["amount"],
            "created_at": tx["created_at"],
            "timeline": tx["timeline"],
            "customer_id": tx["customer_id"],
            "merchant_id": tx["merchant_id"],
            "mandoub_id": tx["mandoub_id"]
        }

    def get_user_transactions(self, user_id: str, limit: int = 20) -> List[Dict]:
        """استخراج معاملات مستخدم"""
        user_txs = []
        for tx in self._transactions.values():
            if user_id in [tx["customer_id"], tx["merchant_id"], tx.get("mandoub_id")]:
                user_txs.append({
                    "order_id": tx["order_id"],
                    "status": tx["status"],
                    "amount": tx["amount"],
                    "created_at": tx["created_at"]
                })

        user_txs.sort(key=lambda x: x["created_at"], reverse=True)
        return user_txs[:limit]

    def get_daily_summary(self, date: str = None) -> Dict:
        """ملخص مالي يومي"""
        if not date:
            date = datetime.now().strftime("%Y-%m-%d")

        total_transactions = 0
        total_amount = 0.0
        total_released = 0.0
        total_refunded = 0.0

        for tx in self._transactions.values():
            if tx["created_at"].startswith(date):
                total_transactions += 1
                total_amount += tx["amount"]
                if tx["status"] == TransactionStatus.RELEASED_TO_MERCHANT.value:
                    total_released += tx["amount"]
                elif tx["status"] == TransactionStatus.REFUNDED.value:
                    total_refunded += tx.get("refund_amount", tx["amount"])

        return {
            "date": date,
            "total_transactions": total_transactions,
            "total_amount": round(total_amount, 2),
            "total_released": round(total_released, 2),
            "total_refunded": round(total_refunded, 2),
            "active_escrow": round(total_amount - total_released - total_refunded, 2)
        }

    # ==========================================
    # أدوات مساعدة
    # ==========================================

    def _generate_order_id(self) -> str:
        prefix = datetime.now().strftime("%Y%m%d")
        suffix = hashlib.md5(str(datetime.now().timestamp()).encode()).hexdigest()[:6].upper()
        return f"BAS-{prefix}-{suffix}"

    def _generate_installation_pin(self, order_id: str) -> str:
        return hashlib.sha256(
            f"INSTALL-{order_id}-{self.encryption_key}".encode()
        ).hexdigest()[:6].upper()

    def _hash_pin(self, pin: str) -> str:
        return hashlib.sha256(
            f"{pin}:{self.encryption_key}".encode()
        ).hexdigest()

    def _get_transaction(self, order_id: str) -> Optional[Dict]:
        return self._transactions.get(order_id)


if __name__ == "__main__":
    engine = BasqorEscrowEngine()

    print("=" * 60)
    print("BASQOR ESCROW ENGINE - JEDDAH")
    print("=" * 60)

    # اختبار: إنشاء معاملة
    result = engine.initiate_transaction(
        customer_id="CUST-001",
        merchant_id="MERC-001",
        amount=350.00,
        part_type="USED_SALVAGE",
        order_type="MARKETPLACE"
    )
    print("\n1. بدء المعاملة:", result)

    # اختبار: تعيين مندوب
    engine.assign_mandoub(result["order_id"], "MAND-001")
    print("\n2. تم تعيين المندوب")

    # اختبار: تأكيد الاستلام
    engine.confirm_pickup(result["order_id"], "MAND-001")
    print("\n3. تم استلام القطعة")

    # اختبار: تأكيد التسليم
    engine.confirm_delivery(result["order_id"], "MAND-001")
    print("\n4. تم تسليم القطعة")

    # اختبار: تأكيد التركيب
    verify = engine.verify_installation(result["order_id"], result["installation_pin"], "WS-001")
    print("\n5. تأكيد التركيب:", verify)

    # اختبار: الاستعلام
    status = engine.get_transaction_status(result["order_id"])
    print("\n6. حالة الطلب:", status["status"])
    print("\nالجدول الزمني:")
    for t in status["timeline"]:
        print(f"  [{t['timestamp']}] {t['status']}: {t['note']}")