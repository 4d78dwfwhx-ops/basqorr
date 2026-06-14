import HeroSearch from '@/components/hero-search'
import { ServicesGrid } from '@/components/services-grid'
import { BrandsSection } from '@/components/brands-section'
import { Card, CardContent } from '@shadcn/ui/card'
import { BarChart, MessageCircle, ShieldCheck, Zap } from 'lucide-react'

function FeaturesRow() {
  return (
    <section className="my-10 grid md:grid-cols-4 gap-6">
      <Card className="bg-white border border-gray-200 text-center shadow-sm rtl">
        <CardContent className="py-6 flex flex-col items-center">
          <ShieldCheck className="text-primary mb-2" size={30} />
          <div className="font-bold mb-1">شراء آمن 100%</div>
          <div className="text-sm text-gray-700">معايير موثوقة لجميع المتاجر والمناديب والخدمات</div>
        </CardContent>
      </Card>
      <Card className="bg-white border border-gray-200 text-center shadow-sm rtl">
        <CardContent className="py-6 flex flex-col items-center">
          <BarChart className="text-primary mb-2" size={30} />
          <div className="font-bold mb-1">أسعار تنافسية</div>
          <div className="text-sm text-gray-700">قارن العروض لكل قطعة أو خدمة، واختَر الأنسب</div>
        </CardContent>
      </Card>
      <Card className="bg-white border border-gray-200 text-center shadow-sm rtl">
        <CardContent className="py-6 flex flex-col items-center">
          <MessageCircle className="text-primary mb-2" size={30} />
          <div className="font-bold mb-1">دعم سريع</div>
          <div className="text-sm text-gray-700">تواصل مباشرة مع البائعين والمناديب عبر الواتساب</div>
        </CardContent>
      </Card>
      <Card className="bg-white border border-gray-200 text-center shadow-sm rtl">
        <CardContent className="py-6 flex flex-col items-center">
          <Zap className="text-primary mb-2" size={30} />
          <div className="font-bold mb-1">خدمات متكاملة</div>
          <div className="text-sm text-gray-700">كل ما تحتاجه سيارتك من قطع وخدمات في منصة واحدة</div>
        </CardContent>
      </Card>
    </section>
  )
}

function StatsSection() {
  const stats = [
    { value: '120,000+', label: 'قطعة متاحة حاليًا' },
    { value: '230+', label: 'متجر وتاجر' },
    { value: '80+', label: 'مقدم خدمة' }
  ]
  return (
    <section className="bg-white border mt-16 rounded-xl p-6 md:p-10 grid md:grid-cols-3 gap-6 text-center items-center shadow-sm">
      {stats.map(s => (
        <div key={s.label} className="flex flex-col gap-2 items-center justify-center">
          <div className="text-3xl font-extrabold text-primary">{s.value}</div>
          <div className="text-base md:text-lg font-medium text-dark/70">{s.label}</div>
        </div>
      ))}
    </section>
  )
}

function Header() {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b bg-white rtl">
      <div className="flex items-center gap-3">
        <img src="/logo-basqor.svg" alt="BASQOR" className="h-10" />
        <span className="text-2xl font-extrabold text-primary">باسقور</span>
      </div>
      <nav className="hidden md:flex gap-8 text-lg font-medium">
        <a href="#services" className="hover:text-primary transition">الخدمات</a>
        <a href="#brands" className="hover:text-primary transition">الماركات</a>
        <a href="#about" className="hover:text-primary transition">عن المنصة</a>
        <a href="#contact" className="hover:text-primary transition">تواصل معنا</a>
      </nav>
      <div className="flex items-center gap-4">
        <button className="bg-primary text-white px-5 py-2 rounded-lg font-bold shadow hover:bg-primary/90 transition">تسجيل الدخول</button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-l from-primary/10 to-white border-t pt-10 pb-6 px-4 md:px-0 rtl">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <img src="/logo-basqor.svg" alt="BASQOR" className="h-10 mb-2" />
          <div className="font-bold text-xl text-primary mb-2">باسقور</div>
          <div className="text-gray-600 text-sm mb-3">
            منصة متكاملة لطلب قطع غيار السيارات والخدمات من أفضل المتاجر والمناديب في المملكة.
          </div>
        </div>
        <div>
          <div className="font-bold mb-2">روابط سريعة</div>
          <ul className="space-y-1 text-gray-700 text-sm">
            <li><a href="#services" className="hover:text-primary">الخدمات</a></li>
            <li><a href="#brands" className="hover:text-primary">الماركات</a></li>
            <li><a href="#about" className="hover:text-primary">عن المنصة</a></li>
            <li><a href="#contact" className="hover:text-primary">تواصل معنا</a></li>
          </ul>
        </div>
        <div>
          <div className="font-bold mb-2">تواصل معنا</div>
          <div className="text-gray-700 text-sm mb-1">واتساب: <a href="https://wa.me/966500000000" className="text-primary hover:underline">+966 50 000 0000</a></div>
          <div className="text-gray-700 text-sm mb-1">البريد: <a href="mailto:support@basqor.com" className="text-primary hover:underline">support@basqor.com</a></div>
        </div>
        <div>
          <div className="font-bold mb-2">تابعنا</div>
          <div className="flex gap-3">
            <a href="#" className="hover:text-primary"><span className="sr-only">تويتر</span><svg width="22" height="22" fill="currentColor" className="text-gray-500"><path d="M22 4.01c-.81.36-1.68.6-2.59.71a4.48 4.48 0 0 0 1.97-2.48 8.94 8.94 0 0 1-2.83 1.08A4.48 4.48 0 0 0 11 8.48c0 .35.04.7.11 1.03A12.74 12.74 0 0 1 2.23 3.13a4.48 4.48 0 0 0 1.39 5.98c-.74-.02-1.44-.23-2.05-.57v.06a4.48 4.48 0 0 0 3.6 4.4c-.35.1-.72.16-1.1.16-.27 0-.53-.03-.78-.07a4.48 4.48 0 0 0 4.18 3.11A9 9 0 0 1 0 19.54a12.7 12.7 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.2 0-.39-.01-.58A9.13 9.13 0 0 0 22 4.01z"/></svg></a>
            <a href="#" className="hover:text-primary"><span className="sr-only">انستجرام</span><svg width="22" height="22" fill="currentColor" className="text-gray-500"><path d="M11 2.2c2.97 0 3.32.01 4.49.06 1.17.05 1.8.24 2.22.41.54.21.93.47 1.34.88.41.41.67.8.88 1.34.17.42.36 1.05.41 2.22.05 1.17.06 1.52.06 4.49s-.01 3.32-.06 4.49c-.05 1.17-.24 1.8-.41 2.22a3.13 3.13 0 0 1-.88 1.34 3.13 3.13 0 0 1-1.34.88c-.42.17-1.05.36-2.22.41-1.17.05-1.52.06-4.49.06s-3.32-.01-4.49-.06c-1.17-.05-1.8-.24-2.22-.41a3.13 3.13 0 0 1-1.34-.88 3.13 3.13 0 0 1-.88-1.34c-.17-.42-.36-1.05-.41-2.22C2.21 14.32 2.2 13.97 2.2 11s.01-3.32.06-4.49c.05-1.17.24-1.8.41-2.22a3.13 3.13 0 0 1 .88-1.34 3.13 3.13 0 0 1 1.34-.88c.42-.17 1.05-.36 2.22-.41C7.68 2.21 8.03 2.2 11 2.2zm0-2.2C8.02 0 7.65.01 6.47.06 5.29.11 4.44.3 3.7.57c-.77.28-1.43.65-2.09 1.31C.65 2.54.28 3.2.01 3.97c-.27.74-.46 1.59-.51 2.77C-.01 7.65 0 8.02 0 11c0 2.98.01 3.35.06 4.53.05 1.18.24 2.03.51 2.77.27.77.64 1.43 1.3 2.09.66.66 1.32 1.03 2.09 1.3.74.27 1.59.46 2.77.51C7.65 21.99 8.02 22 11 22c2.98 0 3.35-.01 4.53-.06 1.18-.05 2.03-.24 2.77-.51.77-.27 1.43-.64 2.09-1.3.66-.66 1.03-1.32 1.3-2.09.27-.74.46-1.59.51-2.77.05-1.18.06-1.55.06-4.53 0-2.98-.01-3.35-.06-4.53-.05-1.18-.24-2.03-.51-2.77-.27-.77-.64-1.43-1.3-2.09C19.46.65 18.8.28 18.03.01c-.74-.27-1.59-.46-2.77-.51C14.35.01 13.98 0 11 0zm0 5.34a5.66 5.66 0 1 0 0 11.32 5.66 5.66 0 0 0 0-11.32zm0 9.34a3.68 3.68 0 1 1 0-7.36 3.68 3.68 0 0 1 0 7.36zm6.88-10.13a1.32 1.32 0 1 0 0 2.64 1.32 1.32 0 0 0 0-2.64z"/></svg></a>
            <a href="#" className="hover:text-primary"><span className="sr-only">لينكدإن</span><svg width="22" height="22" fill="currentColor" className="text-gray-500"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.91 1.65-1.85 3.39-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 21.23.8 22 1.77 22h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.23 0z"/></svg></a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs mt-8">
        © {new Date().getFullYear()} باسقور BASQOR. جميع الحقوق محفوظة.
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-white min-h-screen w-full rtl font-sans">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 md:px-0">
        <HeroSearch />
        <FeaturesRow />
        <ServicesGrid />
        <BrandsSection />
        <StatsSection />
      </main>
      <Footer />
    </div>
  )
}
