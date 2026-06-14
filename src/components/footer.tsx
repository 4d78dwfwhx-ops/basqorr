import Link from 'next/link'

const footerLinks = [
  { href: '/about', label: 'من نحن' },
  { href: '/contact', label: 'تواصل معنا' },
  { href: '/terms', label: 'الشروط' },
  { href: '/privacy', label: 'الخصوصية' },
  { href: '/faq', label: 'الأسئلة الشائعة' },
]

export function Footer() {
  return (
    <footer className="bg-dark text-light w-full mt-16 rtl">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center md:justify-between gap-3">
        <div className="flex flex-wrap gap-6 md:gap-8 mb-4 md:mb-0 text-sm font-medium">
          {footerLinks.map(l => (
            <Link key={l.href} href={l.href} className="hover:underline">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="text-xs text-gray-400 text-center">
          © 2026 BASQOR - المملكة العربية السعودية
        </div>
      </div>
    </footer>
  )
}
