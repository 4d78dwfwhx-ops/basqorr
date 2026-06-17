# 🚗 BASQOR | بسكور

**كل قطعة. كل مكان. بثقة.**

منصة السيارات وقطع الغيار الرائدة في المملكة العربية السعودية.

## 🚀 التشغيل

```bash
npm install
npm run dev
npm run build
© 2026 BASQOR. جميع الحقوق محفوظة.

---

#### 8. `src/app/globals.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Tajawal', system-ui, sans-serif;
    direction: rtl;
    background: #0a0b0d;
    color: #f5f5f7;
    overflow-x: hidden;
  }
}

@layer components {
  .gradient-text {
    background: linear-gradient(135deg, #D4A853 0%, #F9C633 50%, #D4A853 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .glass {
    background: rgba(26, 29, 36, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .glass-strong {
    background: rgba(18, 20, 26, 0.85);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .card-hover {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .card-hover:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(212, 168, 83, 0.25);
    border-color: rgba(212, 168, 83, 0.3);
  }
  .btn-primary {
    @apply bg-gradient-to-r from-gold to-gold-light text-dark-950 font-bold;
    @apply shadow-lg shadow-gold/30 hover:shadow-gold/50;
    @apply transition-all duration-300 hover:scale-105 active:scale-95;
  }
  .btn-secondary {
    @apply glass border-2 border-gold/40 text-gold font-semibold;
    @apply hover:bg-gold/10 hover:border-gold/60;
    @apply transition-all duration-300;
  }
  .glow-gold { box-shadow: 0 0 40px rgba(212, 168, 83, 0.4); }
  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-track { background: #0a0b0d; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #D4A853, #F9C633); border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #F9C633, #D4A853); }
  ::selection { background: rgba(212, 168, 83, 0.3); color: #fff; }
}

@layer utilities {
  .text-balance { text-wrap: balance; }
}
