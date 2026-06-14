"use client";
import { Input } from '@shadcn/ui/input'
import { Button } from '@shadcn/ui/button'
import { useState } from 'react'

const EXAMPLE_VINS = [
  'JTDEPRAE0NJ123456',
  'KMHD841EMHU765432',
  'WDBRF40J43F456789',
]

export default function HeroSearch() {
  const [vin, setVin] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (vin.length === 17) {
      // TODO: route to proper VIN search result page
      alert(`بحث عن رقم الهيكل:\n${vin}`)
    }
  }

  return (
    <section className="w-full py-10 flex flex-col items-center gap-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary max-w-2xl text-center leading-relaxed">
        كل ما تحتاجه سيارتك في مكان واحد
      </h1>
      <p className="text-lg text-dark font-medium opacity-80 max-w-xl text-center mb-3">
        منصة بسكور تجمع القطع الجديدة والمستعملة والخدمات تحت سقف واحد — ابحث برقم الهيكل (VIN) أو تصفح الخدمات والمتاجر بسهولة وأمان.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-lg flex gap-2">
        <Input
          placeholder="أدخل رقم الهيكل (VIN)"
          value={vin}
          maxLength={17}
          onChange={e => setVin(e.target.value.toUpperCase())}
          className="flex-1 text-lg font-bold text-right shadow border-2 border-primary/50 rounded-xl px-5 py-4 tracking-widest bg-white"
          dir="ltr"
        />
        <Button className="bg-primary text-white px-7 py-4 text-lg rounded-xl hover:bg-primary/90 shadow font-bold rtl" type="submit">
          بحث
        </Button>
      </form>
      <div className="mt-1 text-xs text-gray-500 flex flex-wrap justify-center gap-3">
        أمثلة: {EXAMPLE_VINS.map(e => <span key={e} className="font-mono text-dark/60 px-2">{e}</span>)}
      </div>
    </section>
  )
}
