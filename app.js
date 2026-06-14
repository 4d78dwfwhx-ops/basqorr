// ============================================
// BASQOR - UNIFIED ENGINE (CUSTOMER + TRADER)
// VERSION: 3.0.0 - ALL BRANDS SUPPORTED
// ============================================

const BASQOR_WHATSAPP = "966500000000";

// ============================================
// قاعدة بيانات جميع الماركات العالمية
// ============================================
const WMI_DB = {
    // 🇯🇵 ياباني
    'JTD': { make: 'تويوتا', icon: '🚙', country: 'اليابان' },
    'JT2': { make: 'تويوتا', icon: '🚙', country: 'اليابان' },
    'JT1': { make: 'تويوتا', icon: '🚙', country: 'اليابان' },
    'JTH': { make: 'لكزس', icon: '🏎️', country: 'اليابان' },
    'JTJ': { make: 'لكزس', icon: '🏎️', country: 'اليابان' },
    'JN1': { make: 'نيسان', icon: '🚗', country: 'اليابان' },
    'JN8': { make: 'نيسان', icon: '🚗', country: 'اليابان' },
    'JNK': { make: 'انفينيتي', icon: '🚗', country: 'اليابان' },
    'JHM': { make: 'هوندا', icon: '🚘', country: 'اليابان' },
    'JH4': { make: 'اكيورا', icon: '🚘', country: 'اليابان' },
    'JM1': { make: 'مازدا', icon: '🚗', country: 'اليابان' },
    'JM3': { make: 'مازدا', icon: '🚗', country: 'اليابان' },
    'JA3': { make: 'ميتسوبيشي', icon: '🚙', country: 'اليابان' },
    'JA4': { make: 'ميتسوبيشي', icon: '🚙', country: 'اليابان' },
    'JSA': { make: 'سوزوكي', icon: '🚗', country: 'اليابان' },
    'JS1': { make: 'سوزوكي', icon: '🚗', country: 'اليابان' },
    'JF1': { make: 'سوبارو', icon: '🚗', country: 'اليابان' },
    'JF2': { make: 'سوبارو', icon: '🚗', country: 'اليابان' },
    'JAA': { make: 'ايسوزو', icon: '🚛', country: 'اليابان' },
    'JAB': { make: 'ايسوزو', icon: '🚛', country: 'اليابان' },

    // 🇰🇷 كوري
    'KMH': { make: 'هيونداي', icon: '🚘', country: 'كوريا' },
    'KNA': { make: 'كيا', icon: '🚘', country: 'كوريا' },
    'KND': { make: 'كيا', icon: '🚘', country: 'كوريا' },
    'KMT': { make: 'جينيسيس', icon: '🚙', country: 'كوريا' },

    // 🇺🇸 أمريكي
    '1FA': { make: 'فورد', icon: '🚘', country: 'أمريكا' },
    '1FT': { make: 'فورد', icon: '🚛', country: 'أمريكا' },
    '1FM': { make: 'فورد', icon: '🚘', country: 'أمريكا' },
    '1G1': { make: 'شيفروليه', icon: '🚙', country: 'أمريكا' },
    '1GC': { make: 'شيفروليه', icon: '🚛', country: 'أمريكا' },
    '1GT': { make: 'GMC', icon: '🚙', country: 'أمريكا' },
    '1GD': { make: 'GMC', icon: '🚛', country: 'أمريكا' },
    '1G6': { make: 'كاديلاك', icon: '🚙', country: 'أمريكا' },
    '1C3': { make: 'كرايسلر', icon: '🚗', country: 'أمريكا' },
    '1C4': { make: 'دودج', icon: '🚗', country: 'أمريكا' },
    '1C6': { make: 'رام', icon: '🚛', country: 'أمريكا' },
    '1J4': { make: 'جيب', icon: '🚙', country: 'أمريكا' },
    '5YJ': { make: 'تسلا', icon: '🚗', country: 'أمريكا' },
    '1LN': { make: 'لينكولن', icon: '🚙', country: 'أمريكا' },

    // 🇩🇪 ألماني
    'WDD': { make: 'مرسيدس-بنز', icon: '🚙', country: 'ألمانيا' },
    'WDB': { make: 'مرسيدس-بنز', icon: '🚙', country: 'ألمانيا' },
    'WBA': { make: 'BMW', icon: '🚙', country: 'ألمانيا' },
    'WBS': { make: 'BMW M', icon: '🚙', country: 'ألمانيا' },
    'WAU': { make: 'أودي', icon: '🚙', country: 'ألمانيا' },
    'WVW': { make: 'فولكس واجن', icon: '🚗', country: 'ألمانيا' },
    'WVG': { make: 'فولكس واجن', icon: '🚙', country: 'ألمانيا' },
    'WP0': { make: 'بورش', icon: '🏎️', country: 'ألمانيا' },

    // 🇬🇧 بريطاني
    'SAL': { make: 'لاند روفر', icon: '🚙', country: 'بريطانيا' },
    'SAJ': { make: 'جاكوار', icon: '🚙', country: 'بريطانيا' },
    'SCB': { make: 'بنتلي', icon: '🚙', country: 'بريطانيا' },
    'SCA': { make: 'رولز رويس', icon: '🚙', country: 'بريطانيا' },
    'SFD': { make: 'أستون مارتن', icon: '🏎️', country: 'بريطانيا' },

    // 🇸🇪 سويدي
    'YV1': { make: 'فولفو', icon: '🚗', country: 'السويد' },
    'YS3': { make: 'ساب', icon: '🚗', country: 'السويد' },

    // 🇮🇹 إيطالي
    'ZFF': { make: 'فيراري', icon: '🏎️', country: 'إيطاليا' },
    'ZAM': { make: 'مازيراتي', icon: '🚙', country: 'إيطاليا' },
    'ZAR': { make: 'ألفا روميو', icon: '🚗', country: 'إيطاليا' },
    'ZFA': { make: 'فيات', icon: '🚗', country: 'إيطاليا' },

    // 🇫🇷 فرنسي
    'VF1': { make: 'رينو', icon: '🚗', country: 'فرنسا' },
    'VF3': { make: 'بيجو', icon: '🚗', country: 'فرنسا' },
    'VF7': { make: 'سيتروين', icon: '🚗', country: 'فرنسا' },

    // 🇨🇳 صيني
    'LSC': { make: 'شانجان', icon: '🚗', country: 'الصين' },
    'L6T': { make: 'جيلي', icon: '🚗', country: 'الصين' },
    'LVV': { make: 'شيري', icon: '🚗', country: 'الصين' },
    'LGW': { make: 'جريت وول', icon: '🚗', country: 'الصين' },
    'LMG': { make: 'MG', icon: '🚗', country: 'الصين' },
    'LRW': { make: 'تسلا الصين', icon: '🚗', country: 'الصين' },
    'LSG': { make: 'شيفروليه صيني', icon: '🚗', country: 'الصين' },
    'LSV': { make: 'فولكس واجن صيني', icon: '🚗', country: 'الصين' },
    'LJD': { make: 'BYD', icon: '🚗', country: 'الصين' },
    'LNB': { make: 'BAIC', icon: '🚗', country: 'الصين' },
    'LJ8': { make: 'GAC', icon: '🚗', country: 'الصين' },
    'LZE': { make: 'JAC', icon: '🚗', country: 'الصين' },
    'LBV': { make: 'BMW صيني', icon: '🚙', country: 'الصين' },
    'LE4': { make: 'مرسيدس صيني', icon: '🚙', country: 'الصين' },
};

// جدول سنة الموديل
const YEAR_MAP = {
    'A':'1980','B':'1981','C':'1982','D':'1983','E':'1984','F':'1985','G':'1986',
    'H':'1987','J':'1988','K':'1989','L':'1990','M':'1991','N':'1992','P':'1993',
    'R':'1994','S':'1995','T':'1996','V':'1997','W':'1998','X':'1999','Y':'2000',
    '1':'2001','2':'2002','3':'2003','4':'2004','5':'2005','6':'2006','7':'2007',
    '8':'2008','9':'2009',
    'A10':'2010','B10':'2011','C10':'2012','D10':'2013','E10':'2014',
    'F10':'2015','G10':'2016','H10':'2017','J10':'2018','K10':'2019',
    'L10':'2020','M10':'2021','N10':'2022','P10':'2023','R10':'2024',
    'S10':'2025','T10':'2026'
};

let currentVinData = null;
let currentParts = [];
let currentFilter = 'all';

// ============================================
// دالة تحديد السنة
// ============================================
function getYear(vin) {
    const code = vin[9];
    const wmi = vin.substring(0,3);
    if (!code) return 'غير محدد';
    if (code >= 'A' && code <= 'Y') {
        const idx = 'ABCDEFGHJKLMNPRSTVWXY'.indexOf(code);
        if (idx >= 0) {
            if (wmi.startsWith('L') || wmi.startsWith('5') || idx >= 20) return 2010 + idx;
            if (idx >= 10) return 1990 + idx;
            return 1980 + idx;
        }
    }
    if (code >= '1' && code <= '9') return 2000 + parseInt(code);
    return 'غير محدد';
}

// ============================================
// دوال واجهة العميل
// ============================================
function handleSearch() {
    const vin = document.getElementById('vinInput').value.toUpperCase().trim();
    const errorDiv = document.getElementById('vinError');
    errorDiv.classList.add('hidden');

    if (vin.length !== 17) {
        showError('رقم الهيكل يجب أن يتكون من 17 خانة');
        return;
    }
    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) {
        showError('رقم الهيكل يحتوي على أحرف غير صالحة');
        return;
    }

    const wmi = vin.substring(0, 3);
    const manufacturer = WMI_DB[wmi];
    if (!manufacturer) {
        showError('الماركة غير مدعومة حالياً. نعمل على توسيع قاعدة البيانات.');
        return;
    }

    currentVinData = {
        vin: vin,
        make: manufacturer.make,
        icon: manufacturer.icon,
        country: manufacturer.country,
        year: getYear(vin),
        modelCode: vin.substring(3, 8)
    };

    switchStage('stage2');
    setTimeout(() => showResult(), 1000);
}

function showResult() {
    const container = document.getElementById('resultContent');
    container.innerHTML = `
        <div class="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <div class="text-center mb-6">
                <span class="text-5xl">${currentVinData.icon}</span>
                <h2 class="text-2xl font-black mt-3">${currentVinData.make}</h2>
                <p class="text-gray-400">${currentVinData.country} | سنة ${currentVinData.year}</p>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-6">
                <div class="bg-gray-800 p-3 rounded-xl text-center">
                    <p class="text-xs text-gray-500">السنة</p>
                    <p class="text-lg font-bold">${currentVinData.year}</p>
                </div>
                <div class="bg-gray-800 p-3 rounded-xl text-center">
                    <p class="text-xs text-gray-500">الكود</p>
                    <p class="text-sm font-mono text-orange-400" dir="ltr">${currentVinData.modelCode}</p>
                </div>
                <div class="bg-gray-800 p-3 rounded-xl text-center">
                    <p class="text-xs text-gray-500">البلد</p>
                    <p class="text-sm">${currentVinData.country}</p>
                </div>
            </div>
            <button onclick="goToPartsStage()" class="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl transition-all">
                🛒 اطلب قطع غيار لهذه السيارة
            </button>
            <button onclick="resetAll()" class="w-full mt-2 text-gray-500 hover:text-white py-2 transition-all text-sm">
                ↩️ بحث عن سيارة أخرى
            </button>
        </div>
    `;
    switchStage('stage3');
}

function goToPartsStage() {
    currentParts = [];
    document.getElementById('carInfo').textContent = `${currentVinData.make} - ${currentVinData.year}`;
    document.getElementById('partsList').innerHTML = '';
    addPart();
    switchStage('stage4');
}

function addPart() {
    const container = document.getElementById('partsList');
    const index = currentParts.length;
    currentParts.push({ name: '', quantity: 1 });
    const div = document.createElement('div');
    div.className = 'flex gap-2 items-center bg-gray-800 p-3 rounded-xl slide-in';
    div.id = `part-${index}`;
    div.innerHTML = `
        <input type="text" placeholder="اسم القطعة" onchange="updatePart(${index},'name',this.value)"
               class="flex-1 p-2 bg-gray-950 border border-gray-700 rounded-lg text-sm text-right focus:outline-none focus:border-orange-500">
        <input type="number" value="1" min="1" onchange="updatePart(${index},'quantity',this.value)"
               class="w-16 p-2 bg-gray-950 border border-gray-700 rounded-lg text-center text-sm focus:outline-none focus:border-orange-500">
        <button onclick="removePart(${index})" class="text-red-400 hover:text-red-300 px-2">✕</button>
    `;
    container.appendChild(div);
    updateContinueButton();
}

function updatePart(index, key, value) {
    currentParts[index][key] = key === 'quantity' ? parseInt(value) || 1 : value;
    updateContinueButton();
}

function removePart(index) {
    currentParts.splice(index, 1);
    document.getElementById(`part-${index}`).remove();
    updateContinueButton();
}

function updateContinueButton() {
    const hasParts = currentParts.length > 0 && currentParts.some(p => p.name.trim() !== '');
    document.getElementById('btnContinue').disabled = !hasParts;
}

function goToStage5() { switchStage('stage5'); }

function submitOrder() {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const district = document.getElementById('customerDistrict').value;
    const notes = document.getElementById('customerNotes').value.trim();
    if (!name || !phone || !district) { alert('يرجى تعبئة جميع الحقول'); return; }

    const order = {
        id: 'BAS-' + Date.now().toString(36).toUpperCase(),
        vin: currentVinData,
        parts: currentParts.filter(p => p.name.trim()),
        customer: { name, phone, district, notes },
        time: new Date().toLocaleString('ar-SA'),
        status: 'pending'
    };

    const orders = JSON.parse(localStorage.getItem('basqor_orders') || '[]');
    orders.push(order);
    localStorage.setItem('basqor_orders', JSON.stringify(orders));
    document.getElementById('orderId').textContent = order.id;
    switchStage('stage6');

    const partsText = order.parts.map(p => `• ${p.name} (${p.quantity}x)`).join('\n');
    const msg = `🚨 طلب جديد باسكور\n\n📌 ${order.id}\n🚙 ${order.vin.make} - ${order.vin.year}\n🔧:\n${partsText}\n\n👤 ${order.customer.name}\n📞 ${order.customer.phone}\n📍 ${order.customer.district}`;
    window.open(`https://wa.me/${BASQOR_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
}

function showError(msg) {
    const d = document.getElementById('vinError');
    d.textContent = '⚠️ ' + msg;
    d.classList.remove('hidden');
}

function switchStage(id) {
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetAll() {
    currentVinData = null;
    currentParts = [];
    document.getElementById('vinInput').value = '';
    document.getElementById('vinError').classList.add('hidden');
    document.getElementById('partsList').innerHTML = '';
    switchStage('stage1');
    document.getElementById('vinInput').focus();
}

// ============================================
// دوال واجهة التاجر
// ============================================
function loadOrders() {
    const container = document.getElementById('ordersContainer');
    if (!container) return;
    const orders = JSON.parse(localStorage.getItem('basqor_orders') || '[]');
    if (orders.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-600 py-20">لا توجد طلبات</p>';
        updateNewOrdersCount(0);
        return;
    }
    let filtered = orders;
    if (currentFilter === 'pending') filtered = orders.filter(o => o.status === 'pending');
    else if (currentFilter === 'accepted') filtered = orders.filter(o => o.status === 'accepted');
    updateNewOrdersCount(orders.filter(o => o.status === 'pending').length);
    if (filtered.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-600 py-20">لا توجد طلبات</p>';
        return;
    }
    container.innerHTML = filtered.reverse().map(order => `
        <div class="order-card bg-gray-900 p-4 rounded-xl border border-gray-800 status-${order.status==='accepted'?'accepted':order.status==='rejected'?'rejected':'new'}">
            <div class="flex justify-between items-start mb-3">
                <div><span class="font-mono text-orange-400 text-sm">#${order.id}</span>
                <span class="text-xs mr-2 px-2 py-1 rounded-full ${order.status==='accepted'?'bg-green-900 text-green-300':'bg-orange-900 text-orange-300'}">${order.status==='accepted'?'✅ مقبول':'⏳ جديد'}</span></div>
                <span class="text-xs text-gray-600">${order.time}</span>
            </div>
            <p class="font-bold text-lg">${order.vin.icon} ${order.vin.make} - ${order.vin.year}</p>
            <div class="mt-2 space-y-1">${order.parts.map(p => `<p class="text-sm text-gray-400">🔧 ${p.name} (${p.quantity}x)</p>`).join('')}</div>
            <div class="mt-3 p-2 bg-gray-800 rounded-lg"><p class="text-xs text-gray-500">👤 ${order.customer.name} | 📍 ${order.customer.district}</p></div>
            <div class="mt-3 flex gap-2">
                <a href="https://wa.me/${order.customer.phone}" target="_blank" class="flex-1 bg-green-600 hover:bg-green-500 text-white text-center py-2 rounded-lg text-sm font-bold">💬 تواصل</a>
                ${order.status==='pending' ? `
                <button onclick="acceptOrder('${order.id}')" class="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-bold">✅ قبول</button>
                <button onclick="rejectOrder('${order.id}')" class="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold">✕</button>` : ''}
            </div>
        </div>
    `).join('');
}

function acceptOrder(id) {
    const orders = JSON.parse(localStorage.getItem('basqor_orders') || '[]');
    const idx = orders.findIndex(o => o.id === id);
    if (idx !== -1) { orders[idx].status = 'accepted'; localStorage.setItem('basqor_orders', JSON.stringify(orders)); loadOrders(); }
}

function rejectOrder(id) {
    const orders = JSON.parse(localStorage.getItem('basqor_orders') || '[]');
    const idx = orders.findIndex(o => o.id === id);
    if (idx !== -1) { orders[idx].status = 'rejected'; localStorage.setItem('basqor_orders', JSON.stringify(orders)); loadOrders(); }
}

function filterOrders(type) { currentFilter = type; loadOrders(); }
function refreshOrders() { loadOrders(); }

function updateNewOrdersCount(count) {
    const el = document.getElementById('newOrdersCount');
    if (el) {
        el.textContent = count + ' طلبات جديدة';
        el.className = count > 0 ? 'text-xs bg-orange-900 text-orange-300 px-3 py-1 rounded-full' : 'text-xs bg-gray-800 px-3 py-1 rounded-full';
    }
}

// تهيئة
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('ordersContainer')) { loadOrders(); setInterval(loadOrders, 15000); }
    if (document.getElementById('vinInput')) {
        document.getElementById('vinInput').addEventListener('keypress', e => { if (e.key === 'Enter') handleSearch(); });
        document.getElementById('vinInput').addEventListener('input', function(e) { this.value = this.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, ''); });
        document.getElementById('vinInput').focus();
    }
});
