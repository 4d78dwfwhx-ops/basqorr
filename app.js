// ============================================
// BASQOR - UNIFIED ENGINE (CUSTOMER + TRADER)
// VERSION: 2.0.0-JEDDAH
// ============================================

const BASQOR_WHATSAPP = "966500000000";
const BASQOR_API = "https://api.basqor.com/v1";

// ============================================
// قاعدة بيانات VIN
// ============================================
const WMI_DB = {
    'JTD': { make: 'تويوتا', icon: '🚙', country: 'اليابان' },
    'JT2': { make: 'تويوتا', icon: '🚙', country: 'اليابان' },
    'JTH': { make: 'لكزس', icon: '🏎️', country: 'اليابان' },
    'KMH': { make: 'هيونداي', icon: '🚘', country: 'كوريا' },
    'KNA': { make: 'كيا', icon: '🚘', country: 'كوريا' },
    'JN1': { make: 'نيسان', icon: '🚗', country: 'اليابان' },
    'LSC': { make: 'شانجان', icon: '🚗', country: 'الصين' },
    'LGW': { make: 'جريت وول', icon: '🚗', country: 'الصين' },
    'WDD': { make: 'مرسيدس', icon: '🚙', country: 'ألمانيا' },
    'WBA': { make: 'بي إم دبليو', icon: '🚙', country: 'ألمانيا' },
    '1FA': { make: 'فورد', icon: '🚘', country: 'أمريكا' },
    '1GC': { make: 'شيفروليه', icon: '🚙', country: 'أمريكا' },
};

const YEAR_MAP = {
    'A':'2010','B':'2011','C':'2012','D':'2013','E':'2014','F':'2015','G':'2016',
    'H':'2017','J':'2018','K':'2019','L':'2020','M':'2021','N':'2022','P':'2023',
    'R':'2024','S':'2025','T':'2026','1':'2001','2':'2002','3':'2003','4':'2004',
    '5':'2005','6':'2006','7':'2007','8':'2008','9':'2009'
};

let currentVinData = null;
let currentParts = [];
let currentFilter = 'all';

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
        year: YEAR_MAP[vin[9]] || 'غير محدد',
        modelCode: vin.substring(3, 8)
    };

    switchStage('stage2');

    setTimeout(() => {
        showResult();
    }, 1200);
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
            <div class="grid grid-cols-2 gap-3 mb-6">
                <div class="bg-gray-800 p-4 rounded-xl text-center">
                    <p class="text-xs text-gray-500">سنة الصنع</p>
                    <p class="text-xl font-bold">${currentVinData.year}</p>
                </div>
                <div class="bg-gray-800 p-4 rounded-xl text-center">
                    <p class="text-xs text-gray-500">كود الموديل</p>
                    <p class="text-lg font-mono font-bold text-orange-400" dir="ltr">${currentVinData.modelCode}</p>
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

function goToStage5() {
    switchStage('stage5');
}

function submitOrder() {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const district = document.getElementById('customerDistrict').value;
    const notes = document.getElementById('customerNotes').value.trim();

    if (!name || !phone || !district) {
        alert('يرجى تعبئة جميع الحقول المطلوبة');
        return;
    }

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
    const message = `🚨 طلب جديد من باسكور\n\n📌 رقم الطلب: ${order.id}\n🚙 ${order.vin.make} - ${order.vin.year}\n🔧:\n${partsText}\n\n👤 ${order.customer.name}\n📞 ${order.customer.phone}\n📍 ${order.customer.district}`;
    window.open(`https://wa.me/${BASQOR_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank');
}

function showError(msg) {
    const errorDiv = document.getElementById('vinError');
    errorDiv.textContent = '⚠️ ' + msg;
    errorDiv.classList.remove('hidden');
}

function switchStage(stageId) {
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
    document.getElementById(stageId).classList.add('active');
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
        container.innerHTML = '<p class="text-center text-gray-600 py-20">لا توجد طلبات حالياً</p>';
        updateNewOrdersCount(0);
        return;
    }

    let filteredOrders = orders;
    if (currentFilter === 'pending') {
        filteredOrders = orders.filter(o => o.status === 'pending');
    } else if (currentFilter === 'accepted') {
        filteredOrders = orders.filter(o => o.status === 'accepted');
    }

    const newCount = orders.filter(o => o.status === 'pending').length;
    updateNewOrdersCount(newCount);

    if (filteredOrders.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-600 py-20">لا توجد طلبات في هذا التصنيف</p>';
        return;
    }

    container.innerHTML = filteredOrders.reverse().map(order => `
        <div class="order-card bg-gray-900 p-4 rounded-xl border border-gray-800 status-${order.status === 'accepted' ? 'accepted' : order.status === 'rejected' ? 'rejected' : 'new'}">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <span class="font-mono text-orange-400 text-sm">#${order.id}</span>
                    <span class="text-xs mr-2 px-2 py-1 rounded-full ${order.status === 'accepted' ? 'bg-green-900 text-green-300' : 'bg-orange-900 text-orange-300'}">${order.status === 'accepted' ? '✅ مقبول' : '⏳ جديد'}</span>
                </div>
                <span class="text-xs text-gray-600">${order.time}</span>
            </div>
            <p class="font-bold text-lg">${order.vin.icon} ${order.vin.make} - ${order.vin.year}</p>
            <div class="mt-2 space-y-1">
                ${order.parts.map(p => `<p class="text-sm text-gray-400">🔧 ${p.name} (${p.quantity}x)</p>`).join('')}
            </div>
            <div class="mt-3 p-2 bg-gray-800 rounded-lg">
                <p class="text-xs text-gray-500">👤 ${order.customer.name}</p>
                <p class="text-xs text-gray-500">📍 ${order.customer.district}</p>
            </div>
            <div class="mt-3 flex gap-2">
                <a href="https://wa.me/${order.customer.phone}" target="_blank" 
                   class="flex-1 bg-green-600 hover:bg-green-500 text-white text-center py-2 rounded-lg text-sm font-bold transition-all">
                    💬 تواصل
                </a>
                ${order.status === 'pending' ? `
                <button onclick="acceptOrder('${order.id}')" class="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-bold transition-all">
                    ✅ قبول
                </button>
                <button onclick="rejectOrder('${order.id}')" class="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
                    ✕
                </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function acceptOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem('basqor_orders') || '[]');
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
        orders[idx].status = 'accepted';
        localStorage.setItem('basqor_orders', JSON.stringify(orders));
        loadOrders();
    }
}

function rejectOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem('basqor_orders') || '[]');
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
        orders[idx].status = 'rejected';
        localStorage.setItem('basqor_orders', JSON.stringify(orders));
        loadOrders();
    }
}

function filterOrders(type) {
    currentFilter = type;
    loadOrders();
}

function refreshOrders() {
    loadOrders();
}

function updateNewOrdersCount(count) {
    const el = document.getElementById('newOrdersCount');
    if (el) {
        el.textContent = count + ' طلبات جديدة';
        if (count > 0) {
            el.classList.add('bg-orange-900', 'text-orange-300');
            el.classList.remove('bg-gray-800');
        } else {
            el.classList.add('bg-gray-800');
            el.classList.remove('bg-orange-900', 'text-orange-300');
        }
    }
}

// ============================================
// تهيئة
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('ordersContainer')) {
        loadOrders();
        setInterval(loadOrders, 15000);
    }
    if (document.getElementById('vinInput')) {
        document.getElementById('vinInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleSearch();
        });
        document.getElementById('vinInput').addEventListener('input', function(e) {
            this.value = this.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
        });
        document.getElementById('vinInput').focus();
    }
});