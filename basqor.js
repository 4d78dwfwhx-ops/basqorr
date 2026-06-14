/*
 * BASQOR - المحرك الرئيسي
 * جميع ماركات السيارات في المملكة العربية السعودية
 * النسخة 3.0
 */

const BASQOR = {
    whatsapp: "966500000000",
    city: "المملكة العربية السعودية",

    brands: {
        // الياباني
        'JTD': { ar: 'تويوتا', en: 'Toyota', icon: '🚙', country: 'اليابان' },
        'JT2': { ar: 'تويوتا', en: 'Toyota', icon: '🚙', country: 'اليابان' },
        'JT1': { ar: 'تويوتا', en: 'Toyota', icon: '🚙', country: 'اليابان' },
        'JTH': { ar: 'لكزس', en: 'Lexus', icon: '🏎️', country: 'اليابان' },
        'JTJ': { ar: 'لكزس', en: 'Lexus', icon: '🏎️', country: 'اليابان' },
        'JN1': { ar: 'نيسان', en: 'Nissan', icon: '🚗', country: 'اليابان' },
        'JN8': { ar: 'نيسان', en: 'Nissan', icon: '🚗', country: 'اليابان' },
        'JNK': { ar: 'انفينيتي', en: 'Infiniti', icon: '🚗', country: 'اليابان' },
        'JHM': { ar: 'هوندا', en: 'Honda', icon: '🚘', country: 'اليابان' },
        'JH4': { ar: 'اكيورا', en: 'Acura', icon: '🚘', country: 'اليابان' },
        'JM1': { ar: 'مازدا', en: 'Mazda', icon: '🚗', country: 'اليابان' },
        'JM3': { ar: 'مازدا', en: 'Mazda', icon: '🚗', country: 'اليابان' },
        'JA3': { ar: 'ميتسوبيشي', en: 'Mitsubishi', icon: '🚙', country: 'اليابان' },
        'JA4': { ar: 'ميتسوبيشي', en: 'Mitsubishi', icon: '🚙', country: 'اليابان' },
        'JSA': { ar: 'سوزوكي', en: 'Suzuki', icon: '🚗', country: 'اليابان' },
        'JS1': { ar: 'سوزوكي', en: 'Suzuki', icon: '🚗', country: 'اليابان' },
        'JF1': { ar: 'سوبارو', en: 'Subaru', icon: '🚗', country: 'اليابان' },
        'JF2': { ar: 'سوبارو', en: 'Subaru', icon: '🚗', country: 'اليابان' },
        'JAA': { ar: 'ايسوزو', en: 'Isuzu', icon: '🚛', country: 'اليابان' },
        'JAB': { ar: 'ايسوزو', en: 'Isuzu', icon: '🚛', country: 'اليابان' },
        'JDA': { ar: 'دايهاتسو', en: 'Daihatsu', icon: '🚗', country: 'اليابان' },

        // الكوري
        'KMH': { ar: 'هيونداي', en: 'Hyundai', icon: '🚘', country: 'كوريا' },
        'KNA': { ar: 'كيا', en: 'Kia', icon: '🚘', country: 'كوريا' },
        'KND': { ar: 'كيا', en: 'Kia', icon: '🚘', country: 'كوريا' },
        'KNJ': { ar: 'كيا', en: 'Kia', icon: '🚘', country: 'كوريا' },
        'KMT': { ar: 'جينيسيس', en: 'Genesis', icon: '🚙', country: 'كوريا' },

        // الأمريكي
        '1FA': { ar: 'فورد', en: 'Ford', icon: '🚘', country: 'أمريكا' },
        '1FT': { ar: 'فورد', en: 'Ford', icon: '🚛', country: 'أمريكا' },
        '1FM': { ar: 'فورد', en: 'Ford', icon: '🚘', country: 'أمريكا' },
        '1GC': { ar: 'شفروليه', en: 'Chevrolet', icon: '🚙', country: 'أمريكا' },
        '1G1': { ar: 'شفروليه', en: 'Chevrolet', icon: '🚙', country: 'أمريكا' },
        '1GT': { ar: 'جي إم سي', en: 'GMC', icon: '🚙', country: 'أمريكا' },
        '1GD': { ar: 'جي إم سي', en: 'GMC', icon: '🚛', country: 'أمريكا' },
        '1G6': { ar: 'كاديلاك', en: 'Cadillac', icon: '🚙', country: 'أمريكا' },
        '1C3': { ar: 'كرايسلر', en: 'Chrysler', icon: '🚗', country: 'أمريكا' },
        '1C4': { ar: 'دودج', en: 'Dodge', icon: '🚗', country: 'أمريكا' },
        '1C6': { ar: 'رام', en: 'RAM', icon: '🚛', country: 'أمريكا' },
        '1J4': { ar: 'جيب', en: 'Jeep', icon: '🚙', country: 'أمريكا' },
        '5YJ': { ar: 'تسلا', en: 'Tesla', icon: '🚗', country: 'أمريكا' },
        '1LN': { ar: 'لينكولن', en: 'Lincoln', icon: '🚙', country: 'أمريكا' },
        '2C3': { ar: 'كرايسلر', en: 'Chrysler', icon: '🚗', country: 'أمريكا' },
        '2C4': { ar: 'دودج', en: 'Dodge', icon: '🚗', country: 'أمريكا' },

        // الألماني
        'WDD': { ar: 'مرسيدس-بنز', en: 'Mercedes-Benz', icon: '🚙', country: 'ألمانيا' },
        'WDB': { ar: 'مرسيدس-بنز', en: 'Mercedes-Benz', icon: '🚙', country: 'ألمانيا' },
        'WBA': { ar: 'بي إم دبليو', en: 'BMW', icon: '🚙', country: 'ألمانيا' },
        'WBS': { ar: 'بي إم دبليو', en: 'BMW', icon: '🚙', country: 'ألمانيا' },
        'WAU': { ar: 'أودي', en: 'Audi', icon: '🚙', country: 'ألمانيا' },
        'WVW': { ar: 'فولكس واجن', en: 'Volkswagen', icon: '🚗', country: 'ألمانيا' },
        'WVG': { ar: 'فولكس واجن', en: 'Volkswagen', icon: '🚙', country: 'ألمانيا' },
        'WP0': { ar: 'بورش', en: 'Porsche', icon: '🏎️', country: 'ألمانيا' },

        // البريطاني
        'SAL': { ar: 'لاند روفر', en: 'Land Rover', icon: '🚙', country: 'بريطانيا' },
        'SAJ': { ar: 'جاكوار', en: 'Jaguar', icon: '🚙', country: 'بريطانيا' },
        'SCB': { ar: 'بنتلي', en: 'Bentley', icon: '🚙', country: 'بريطانيا' },
        'SCA': { ar: 'رولز رويس', en: 'Rolls-Royce', icon: '🚙', country: 'بريطانيا' },
        'SFD': { ar: 'أستون مارتن', en: 'Aston Martin', icon: '🏎️', country: 'بريطانيا' },
        'SBM': { ar: 'ماكلارين', en: 'McLaren', icon: '🏎️', country: 'بريطانيا' },

        // السويدي
        'YV1': { ar: 'فولفو', en: 'Volvo', icon: '🚗', country: 'السويد' },

        // الإيطالي
        'ZFF': { ar: 'فيراري', en: 'Ferrari', icon: '🏎️', country: 'إيطاليا' },
        'ZAM': { ar: 'مازيراتي', en: 'Maserati', icon: '🚙', country: 'إيطاليا' },
        'ZAR': { ar: 'ألفا روميو', en: 'Alfa Romeo', icon: '🚗', country: 'إيطاليا' },
        'ZFA': { ar: 'فيات', en: 'Fiat', icon: '🚗', country: 'إيطاليا' },
        'ZHW': { ar: 'لامبورغيني', en: 'Lamborghini', icon: '🏎️', country: 'إيطاليا' },

        // الفرنسي
        'VF1': { ar: 'رينو', en: 'Renault', icon: '🚗', country: 'فرنسا' },
        'VF3': { ar: 'بيجو', en: 'Peugeot', icon: '🚗', country: 'فرنسا' },
        'VF7': { ar: 'سيتروين', en: 'Citroen', icon: '🚗', country: 'فرنسا' },

        // الصيني
        'LSC': { ar: 'شانجان', en: 'Changan', icon: '🚗', country: 'الصين' },
        'L6T': { ar: 'جيلي', en: 'Geely', icon: '🚗', country: 'الصين' },
        'LSJ': { ar: 'جيلي', en: 'Geely', icon: '🚗', country: 'الصين' },
        'LVV': { ar: 'شيري', en: 'Chery', icon: '🚗', country: 'الصين' },
        'LGW': { ar: 'جريت وول', en: 'Great Wall', icon: '🚗', country: 'الصين' },
        'LMG': { ar: 'إم جي', en: 'MG', icon: '🚗', country: 'الصين' },
        'LJD': { ar: 'بي واي دي', en: 'BYD', icon: '🚗', country: 'الصين' },
        'LNB': { ar: 'بايك', en: 'BAIC', icon: '🚗', country: 'الصين' },
        'LJ8': { ar: 'جاك', en: 'GAC', icon: '🚗', country: 'الصين' },
        'LZE': { ar: 'جاك', en: 'JAC', icon: '🚗', country: 'الصين' },
        'LKG': { ar: 'هافال', en: 'Haval', icon: '🚗', country: 'الصين' },
    },

    years: {
        'A':'2010','B':'2011','C':'2012','D':'2013','E':'2014','F':'2015',
        'G':'2016','H':'2017','J':'2018','K':'2019','L':'2020','M':'2021',
        'N':'2022','P':'2023','R':'2024','S':'2025','T':'2026'
    },

    search: function() {
        const vin = document.getElementById('vinInput').value.toUpperCase().trim();
        const resultDiv = document.getElementById('vinResult');

        if (vin.length !== 17) {
            resultDiv.innerHTML = '<div class="bg-red-900/30 border border-red-700 rounded-xl p-4 text-red-300 text-right">⚠️ رقم الهيكل يجب أن يتكون من 17 خانة</div>';
            return;
        }

        const brand = this.brands[vin.substring(0, 3)];
        const year = this.years[vin[9]] || 'غير محدد';

        if (!brand) {
            resultDiv.innerHTML = '<div class="bg-yellow-900/30 border border-yellow-700 rounded-xl p-4 text-yellow-300 text-right">⚠️ الماركة غير مدعومة حالياً. جاري توسيع قاعدة البيانات.</div>';
            return;
        }

        resultDiv.innerHTML = `
            <div class="bg-green-900/30 border border-green-700 rounded-xl p-6 text-right">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-4xl">${brand.icon}</span>
                    <span class="text-green-300 text-sm">${brand.country}</span>
                </div>
                <p class="text-2xl font-black text-white mb-1">${brand.ar}</p>
                <p class="text-gray-400 text-sm mb-3">${brand.en}</p>
                <div class="grid grid-cols-2 gap-3 mb-4">
                    <div class="bg-gray-800 p-3 rounded-xl text-center">
                        <p class="text-xs text-gray-500">سنة الموديل</p>
                        <p class="text-lg font-bold">${year}</p>
                    </div>
                    <div class="bg-gray-800 p-3 rounded-xl text-center">
                        <p class="text-xs text-gray-500">رقم الهيكل</p>
                        <p class="text-sm font-mono text-orange-400">${vin.substring(0,8)}...</p>
                    </div>
                </div>
                <a href="https://wa.me/${this.whatsapp}?text=السلام عليكم - ابحث عن قطع غيار ${brand.ar} ${year}" 
                   target="_blank" 
                   class="block w-full bg-green-600 hover:bg-green-500 text-white text-center py-3 rounded-xl font-bold transition-all">
                    💬 طلب قطع غيار واتساب
                </a>
            </div>
        `;
    },

    loadOrders: function() {
        const container = document.getElementById('ordersContainer');
        if (!container) return;

        const orders = JSON.parse(localStorage.getItem('basqor_orders') || '[]');

        if (orders.length === 0) {
            container.innerHTML = '<p class="text-center text-gray-600 py-20">لا توجد طلبات حالياً</p>';
            return;
        }

        container.innerHTML = orders.reverse().map(order => `
            <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
                <div class="flex justify-between items-start mb-3">
                    <span class="font-mono text-orange-400 text-sm">#${order.id}</span>
                    <span class="text-xs px-2 py-1 rounded-full ${order.status === 'accepted' ? 'bg-green-900 text-green-300' : 'bg-orange-900 text-orange-300'}">${order.status === 'accepted' ? '✅ مقبول' : '⏳ جديد'}</span>
                </div>
                <p class="font-bold text-lg">${order.vin.icon} ${order.vin.make} - ${order.vin.year}</p>
                <p class="text-sm text-gray-400 mt-1">🔧 ${order.parts.map(p => p.name).join('، ')}</p>
                <div class="mt-3 p-2 bg-gray-800 rounded-lg">
                    <p class="text-xs text-gray-500">👤 ${order.customer.name} | 📞 ${order.customer.phone}</p>
                </div>
                ${order.status === 'pending' ? `
                <button onclick="BASQOR.acceptOrder('${order.id}')" class="w-full mt-3 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-bold transition-all">
                    ✅ قبول الطلب
                </button>` : ''}
            </div>
        `).join('');
    },

    acceptOrder: function(id) {
        const orders = JSON.parse(localStorage.getItem('basqor_orders') || '[]');
        const idx = orders.findIndex(o => o.id === id);
        if (idx !== -1) {
            orders[idx].status = 'accepted';
            localStorage.setItem('basqor_orders', JSON.stringify(orders));
            this.loadOrders();
        }
    }
};

function searchVIN() { BASQOR.search(); }

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('ordersContainer')) {
        BASQOR.loadOrders();
        setInterval(function() { BASQOR.loadOrders(); }, 15000);
    }
    const vinInput = document.getElementById('vinInput');
    if (vinInput) {
        vinInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') BASQOR.search();
        });
        vinInput.focus();
    }
});
