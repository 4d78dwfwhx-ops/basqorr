import Link from 'next/link';
import { Wrench, Warehouse, Car, Truck, Store, Users, Truck, Sparkles } from 'lucide-react';

const services = [
  {
    icon: <Wrench className="w-7 h-7 text-primary" />,
    title: 'قطع غيار جديدة',
    desc: 'سوق تتبع رقم الهيكل أو العلامة التجارية وابحث عن أفضل الأسعار',
    href: '/parts/new',
  },
  {
    icon: <Warehouse className="w-7 h-7 text-primary" />,
    title: 'تشاليح - قطع مستعملة',
    desc: 'خدمات التشاليح واستعراض قطع الغيار المستعملة وطلبها مباشرة',
    href: '/parts/used',
  },
  {
    icon: <Users className="w-7 h-7 text-primary" />,
    title: 'مناديب قطع',
    desc: 'اطلب مندوب للبحث وتوصيل قطع الغيار إليك بسرعة',
    href: '/parts/runners',
  },
  {
    icon: <Car className="w-7 h-7 text-primary" />,
    title: 'خدمات المركبات',
    desc: 'ورش وصيانة وفحص وخدمة المركبة حسب الموقع أو التخصص',
    href: '/services',
  },
  {
    icon: <Truck className="w-7 h-7 text-primary" />,
    title: 'سطحات / سحب',
    desc: 'خدمة سحب السيارات والطوارئ مع تسعير سريع حسب المسافة',
    href: '/services/towing',
  },
  {
    icon: <Sparkles className="w-7 h-7 text-primary" />,
    title: 'غسيل المركبات',
    desc: 'حجز غسيل متنقل أو خدمات العناية والتلميع للسيارة',
    href: '/services/car-wash',
  },
  {
    icon: <Store className="w-7 h-7 text-primary" />,
    title: 'متاجر متخصصة',
    desc: 'منصة متعددة التجار لكل مستلزمات السيارات مع صفحة خاصة لكل متجر',
    href: '/stores',
  },
]

export function ServicesGrid() {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-dark mb-6 text-center">خدمات منصة بسكور</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((svc, i) => (
          <Link href={svc.href} key={svc.title} className="block group">
            <div className="bg-white shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center transition hover:-translate-y-1 hover:shadow-lg border border-gray-200 h-full min-h-[210px]">
              <div className="mb-3">{svc.icon}</div>
              <div className="text-lg font-semibold mb-1 text-dark group-hover:text-primary">{svc.title}</div>
              <div className="text-sm text-gray-500 group-hover:text-dark">{svc.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
