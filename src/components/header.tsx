import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/parts/new', label: 'قطع غيار' },
  { href: '/parts/used', label: 'تشاليح' },
  { href: '/parts/runners', label: 'مناديب' },
  { href: '/services', label: 'خدمات' },
  { href: '/stores', label: 'متاجر' },
];

export function Header() {
  return (
    <header className="w-full bg-primary text-white rtl">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-extrabold text-2xl tracking-tight">BASQOR</span>
          <span className="text-xs font-light hidden sm:inline-block">منصة السيارات السعودية</span>
        </Link>
        <nav className="flex-1 flex justify-center gap-4 md:gap-8">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="hover:underline font-medium text-base">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/stores?join=1" className="bg-white text-primary font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition">
            انضم كتاجر
          </Link>
        </div>
      </div>
    </header>
  );
}
