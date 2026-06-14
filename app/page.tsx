export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3f3f3] flex flex-col items-stretch font-sans" dir="rtl">
      {/* Header/navbar placeholder (will fill in next) */}
      <div id="afyal-navbar" className="shadow-sm w-full bg-white z-10" />
      {/* Hero: Title/Search/Form core area */}
      <section id="afyal-hero" className="w-full max-w-3xl mx-auto mt-8 mb-4 p-6 rounded-lg bg-white shadow-lg flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#343535] text-center mb-4">قطع غيار سيارات</h1>
        <form className="w-full flex gap-2 max-w-md mx-auto mb-2">
          <input
            className="flex-1 rounded-lg border border-[#c2c8ca] px-4 py-2 text-lg outline-none"
            type="text"
            placeholder="ابحث برقم الهيكل أو رقم القطعة"
          />
          <button className="bg-[#de3c44] text-white px-6 py-2 rounded-lg font-bold text-lg hover:bg-[#b92e37] transition-colors" type="submit">بحث</button>
        </form>
        <div className="text-xs text-[#949da3] text-center space-x-4 flex items-center justify-center mb-2 gap-2">
          <span>أمثلة:</span>
          <a href="#" className="hover:underline">JTHBJ46G9B2420251</a>
          <a href="#" className="hover:underline">GSV40-2362282</a>
          <a href="#" className="hover:underline">879310KD00</a>
        </div>
        <a href="#vin-help" className="text-sm text-[#66a7af] hover:underline">ماهو رقم الهيكل؟</a>
      </section>
      {/* Features block */}
      <section id="afyal-features" className="flex flex-wrap justify-center items-center gap-6 py-4 w-full max-w-2xl mx-auto text-[#343535] text-base">
        <div className="bg-[#e5e9e8] rounded-lg px-8 py-3 font-semibold">قطع أصليه</div>
        <div className="bg-[#e5e9e8] rounded-lg px-8 py-3 font-semibold">أسعار أفضل</div>
        <div className="bg-[#e5e9e8] rounded-lg px-8 py-3 font-semibold">شراء مباشر</div>
      </section>
      {/* Brands (row of car brands) */}
      <section id="afyal-brands" className="w-full max-w-2xl mx-auto pt-6 pb-10 flex flex-wrap justify-center gap-4">
        <a className="brand-btn bg-white rounded shadow px-5 py-2 text-[#343535] border hover:border-[#de3c44] font-bold text-lg" href="#">تويوتا</a>
        <a className="brand-btn bg-white rounded shadow px-5 py-2 text-[#343535] border hover:border-[#de3c44] font-bold text-lg" href="#">لكزس</a>
        <a className="brand-btn bg-white rounded shadow px-5 py-2 text-[#343535] border hover:border-[#de3c44] font-bold text-lg" href="#">هونداي</a>
        <a className="brand-btn bg-white rounded shadow px-5 py-2 text-[#343535] border hover:border-[#de3c44] font-bold text-lg" href="#">كيا</a>
        <a className="brand-btn bg-white rounded shadow px-5 py-2 text-[#343535] border hover:border-[#de3c44] font-bold text-lg" href="#">نيسان</a>
        <a className="brand-btn bg-white rounded shadow px-5 py-2 text-[#343535] border hover:border-[#de3c44] font-bold text-lg" href="#">انفنيتي</a>
        <a className="brand-btn bg-white rounded shadow px-5 py-2 text-[#343535] border hover:border-[#de3c44] font-bold text-lg" href="#">مازدا</a>
      </section>
      {/* Footer */}
      <footer id="afyal-footer" className="w-full bg-[#343535] text-[#f3f3f3] text-sm py-6 mt-auto">
        <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row gap-2 justify-between items-center rtl text-center">
          <div className="flex flex-row flex-wrap gap-3">
            <a href="#" className="hover:underline">اتفاقية استخدام الموقع</a>
            <a href="#" className="hover:underline">قطع غيار تويوتا</a>
            <a href="#" className="hover:underline">قطع غيار لكزس</a>
            <a href="#" className="hover:underline">أسئلة متكررة</a>
            <a href="#" className="hover:underline">سوق أفيال</a>
            <a href="#" className="hover:underline">اتصل بنا</a>
            <a href="#" className="hover:underline">أسعار قطع غيار السيارات</a>
          </div>
          <span className="block mt-2 sm:mt-0">© {new Date().getFullYear()} أفيال</span>
        </div>
      </footer>
    </main>
  );
}
