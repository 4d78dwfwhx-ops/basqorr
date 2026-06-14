const brands = [
  { logo: 'https://ext.same-assets.com/850328263/1539003695.webp', name: 'تويوتا' },
  { logo: 'https://ext.same-assets.com/850328263/2203748696.webp', name: 'لكزس' },
  { logo: 'https://ext.same-assets.com/850328263/2027009346.webp', name: 'هيونداي' },
  { logo: 'https://ext.same-assets.com/850328263/3144818542.webp', name: 'كيا' },
  { logo: 'https://ext.same-assets.com/850328263/1539003695.webp', name: 'نيسان' },
  { logo: 'https://ext.same-assets.com/850328263/2444290340.webp', name: 'هوندا' },
  { logo: 'https://ext.same-assets.com/850328263/1539003695.webp', name: 'مازدا' },
  { logo: 'https://ext.same-assets.com/850328263/2562409227.webp', name: 'مرسيدس' },
  { logo: 'https://ext.same-assets.com/850328263/900949756.webp', name: 'بي إم دبليو' },
  { logo: 'https://ext.same-assets.com/850328263/3244290340.webp', name: 'فورد' },
  { logo: 'https://ext.same-assets.com/850328263/900949756.webp', name: 'شيفروليه' },
  { logo: 'https://ext.same-assets.com/850328263/3323386418.webp', name: 'جمس' },
  { logo: 'https://ext.same-assets.com/850328263/169634771.webp', name: 'شانجان' },
  { logo: 'https://ext.same-assets.com/850328263/205368406.webp', name: 'جيلي' },
]

export function BrandsSection() {
  return (
    <section className="my-12">
      <h2 className="text-xl md:text-2xl font-extrabold text-dark text-center mb-6">أشهر العلامات في منصة بسكور</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 md:gap-8 py-2">
        {brands.map(b => (
          <div key={b.name} className="flex flex-col items-center bg-white rounded-xl shadow-sm p-3 border border-gray-200">
            <img src={b.logo} alt={b.name + ' logo'} className="w-12 h-12 object-contain mb-1" />
            <div className="text-xs font-medium text-dark text-center">{b.name}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
