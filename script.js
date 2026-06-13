// ============================================
// BASQORR - محرك البحث الشامل عن قطع الغيار
// يدعم جميع ماركات السيارات في السعودية
// ============================================

// ==========================================
// 1. قاعدة بيانات الماركات العالمية
// ==========================================
const WMI_DATABASE = {
    // تويوتا و لكزس
    'JTD': { make: 'تويوتا', makeEn: 'Toyota', icon: '🚙', market: 'اليابان' },
    'JT2': { make: 'تويوتا', makeEn: 'Toyota', icon: '🚙', market: 'اليابان' },
    'JT1': { make: 'تويوتا', makeEn: 'Toyota', icon: '🚙', market: 'اليابان' },
    'JTH': { make: 'لكزس', makeEn: 'Lexus', icon: '🏎️', market: 'اليابان' },
    'JTJ': { make: 'لكزس', makeEn: 'Lexus', icon: '🏎️', market: 'اليابان' },
    
    // نيسان و انفينيتي
    'JN1': { make: 'نيسان', makeEn: 'Nissan', icon: '🚘', market: 'اليابان' },
    'JN8': { make: 'نيسان', makeEn: 'Nissan', icon: '🚘', market: 'اليابان' },
    'JNK': { make: 'انفينيتي', makeEn: 'Infiniti', icon: '🚘', market: 'اليابان' },
    
    // هوندا و اكورا
    'JHM': { make: 'هوندا', makeEn: 'Honda', icon: '🚗', market: 'اليابان' },
    'JH4': { make: 'اكيورا', makeEn: 'Acura', icon: '🚗', market: 'اليابان' },
    
    // هيونداي و كيا و جينيسيس
    'KMH': { make: 'هيونداي', makeEn: 'Hyundai', icon: '🚙', market: 'كوريا' },
    'KNA': { make: 'كيا', makeEn: 'Kia', icon: '🚙', market: 'كوريا' },
    'KND': { make: 'كيا', makeEn: 'Kia', icon: '🚙', market: 'كوريا' },
    'KMT': { make: 'جينيسيس', makeEn: 'Genesis', icon: '🚙', market: 'كوريا' },
    
    // مازدا
    'JM1': { make: 'مازدا', makeEn: 'Mazda', icon: '🚗', market: 'اليابان' },
    'JM3': { make: 'مازدا', makeEn: 'Mazda', icon: '🚗', market: 'اليابان' },
    
    // سوبارو
    'JF1': { make: 'سوبارو', makeEn: 'Subaru', icon: '🚗', market: 'اليابان' },
    'JF2': { make: 'سوبارو', makeEn: 'Subaru', icon: '🚗', market: 'اليابان' },
    
    // متسوبيشي
    'JA3': { make: 'ميتسوبيشي', makeEn: 'Mitsubishi', icon: '🚘', market: 'اليابان' },
    'JA4': { make: 'ميتسوبيشي', makeEn: 'Mitsubishi', icon: '🚘', market: 'اليابان' },
    
    // سوزوكي
    'JSA': { make: 'سوزوكي', makeEn: 'Suzuki', icon: '🚗', market: 'اليابان' },
    'JS1': { make: 'سوزوكي', makeEn: 'Suzuki', icon: '🚗', market: 'اليابان' },
    
    // مرسيدس
    'WDD': { make: 'مرسيدس-بنز', makeEn: 'Mercedes-Benz', icon: '🚙', market: 'ألمانيا' },
    'WDB': { make: 'مرسيدس-بنز', makeEn: 'Mercedes-Benz', icon: '🚙', market: 'ألمانيا' },
    
    // بي إم دبليو
    'WBA': { make: 'بي إم دبليو', makeEn: 'BMW', icon: '🚙', market: 'ألمانيا' },
    'WBS': { make: 'بي إم دبليو', makeEn: 'BMW', icon: '🚙', market: 'ألمانيا' },
    
    // أودي
    'WAU': { make: 'أودي', makeEn: 'Audi', icon: '🚙', market: 'ألمانيا' },
    
    // فولكس واجن
    'WVW': { make: 'فولكس واجن', makeEn: 'Volkswagen', icon: '🚙', market: 'ألمانيا' },
    'WVG': { make: 'فولكس واجن', makeEn: 'Volkswagen', icon: '🚙', market: 'ألمانيا' },
    
    // فورد
    '1FA': { make: 'فورد', makeEn: 'Ford', icon: '🚘', market: 'أمريكا' },
    '1FT': { make: 'فورد', makeEn: 'Ford', icon: '🚘', market: 'أمريكا' },
    '1FM': { make: 'فورد', makeEn: 'Ford', icon: '🚘', market: 'أمريكا' },
    
    // شيفروليه
    '1G1': { make: 'شيفروليه', makeEn: 'Chevrolet', icon: '🚙', market: 'أمريكا' },
    '1GC': { make: 'شيفروليه', makeEn: 'Chevrolet', icon: '🚙', market: 'أمريكا' },
    
    // جي إم سي
    '1GT': { make: 'جي إم سي', makeEn: 'GMC', icon: '🚙', market: 'أمريكا' },
    '1GD': { make: 'جي إم سي', makeEn: 'GMC', icon: '🚙', market: 'أمريكا' },
    
    // كاديلاك
    '1G6': { make: 'كاديلاك', makeEn: 'Cadillac', icon: '🚙', market: 'أمريكا' },
    
    // شانجان
    'LSC': { make: 'شانجان', makeEn: 'Changan', icon: '🚗', market: 'الصين' },
    
    // جيلي
    'L6T': { make: 'جيلي', makeEn: 'Geely', icon: '🚗', market: 'الصين' },
    
    // شيري
    'LVV': { make: 'شيري', makeEn: 'Chery', icon: '🚗', market: 'الصين' },
    
    // هافال / جريت وول
    'LGW': { make: 'جريت وول', makeEn: 'Great Wall', icon: '🚗', market: 'الصين' },
    
    // رينو
    'VF1': { make: 'رينو', makeEn: 'Renault', icon: '🚗', market: 'فرنسا' },
    
    // بيجو
    'VF3': { make: 'بيجو', makeEn: 'Peugeot', icon: '🚗', market: 'فرنسا' },
    
    // لاند روفر / جاكوار
    'SAL': { make: 'لاند روفر', makeEn: 'Land Rover', icon: '🚙', market: 'بريطانيا' },
    'SAJ': { make: 'جاكوار', makeEn: 'Jaguar', icon: '🚙', market: 'بريطانيا' },
    
    // فولفو
    'YV1': { make: 'فولفو', makeEn: 'Volvo', icon: '🚗', market: 'السويد' },
    
    // تسلا
    '5YJ': { make: 'تسلا', makeEn: 'Tesla', icon: '🚗', market: 'أمريكا' },
    
    // إيسوزو
    'JAA': { make: 'إيسوزو', makeEn: 'Isuzu', icon: '🚘', market: 'اليابان' },
};

// ==========================================
// 2. جدول سنة الموديل (الخانة 10)
// ==========================================
const YEAR_MAP = {
    'A':'1980','B':'1981','C':'1982','D':'1983','E':'1984',
    'F':'1985','G':'1986','H':'1987','J':'1988','K':'1989',
    'L':'1990','M':'1991','N':'1992','P':'1993','R':'1994',
    'S':'1995','T':'1996','V':'1997','W':'1998','X':'1999',
    'Y':'2000',
    '1':'2001','2':'2002','3':'2003','4':'2004','5':'2005',
    '6':'2006','7':'2007','8':'2008','9':'2009',
    'A':'2010','B':'2011','C':'2012','D':'2013','E':'2014',
    'F':'2015','G':'2016','H':'2017','J':'2018','K':'2019',
    'L':'2020','M':'2021','N':'2022','P':'2023','R':'2024',
    'S':'2025','T':'2026','V':'2027','W':'2028','X':'2029',
    'Y':'2030'
};

// ==========================================
// 3. روابط البحث عن قطع الغيار حسب الماركة
// ==========================================
function getPartsLink(makeEn, vin) {
    const partsSites = {
        'Toyota': `https://partsouq.com/en/catalog/genuine/vehicle?c=TOYOTA&vin=${vin}`,
        'Lexus': `https://partsouq.com/en/catalog/genuine/vehicle?c=LEXUS&vin=${vin}`,
        'Nissan': `https://partsouq.com/en/catalog/genuine/vehicle?c=NISSAN&vin=${vin}`,
        'Hyundai': `https://partsouq.com/en/catalog/genuine/vehicle?c=HYUNDAI&vin=${vin}`,
        'Kia': `https://partsouq.com/en/catalog/genuine/vehicle?c=KIA&vin=${vin}`,
        'Honda': `https://partsouq.com/en/catalog/genuine/vehicle?c=HONDA&vin=${vin}`,
        'Mazda': `https://partsouq.com/en/catalog/genuine/vehicle?c=MAZDA&vin=${vin}`,
        'Ford': `https://partsouq.com/en/catalog/genuine/vehicle?c=FORD&vin=${vin}`,
        'Chevrolet': `https://partsouq.com/en/catalog/genuine/vehicle?c=CHEVROLET&vin=${vin}`,
        'GMC': `https://partsouq.com/en/catalog/genuine/vehicle?c=GMC&vin=${vin}`,
        'BMW': `https://partsouq.com/en/catalog/genuine/vehicle?c=BMW&vin=${vin}`,
        'Mercedes-Benz': `https://partsouq.com/en/catalog/genuine/vehicle?c=MERCEDES&vin=${vin}`,
        'Audi': `https://partsouq.com/en/catalog/genuine/vehicle?c=AUDI&vin=${vin}`,
    };
    
    if (partsSites[makeEn]) {
        return partsSites[makeEn];
    }
    
    // رابط عام للماركات الأخرى
    return `https://partsouq.com/en/catalog/genuine/vehicle?vin=${vin}`;
}

// ==========================================
// 4. دالة فك تشفير VIN الشاملة
// ==========================================
function decodeVIN(vin) {
    vin = vin.toUpperCase().trim();
    
    if (vin.length !== 17) {
        return { error: 'رقم الهيكل يجب أن يتكون من 17 خانة' };
    }
    
    // التحقق من صحة الرقم (حروف وأرقام فقط)
    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) {
        return { error: 'رقم الهيكل يحتوي على أحرف غير صالحة' };
    }
    
    const wmi = vin.substring(0, 3);
    const modelCode = vin.substring(3, 7);
    const yearCode = vin[9];
    const plantCode = vin[10];
    const serial = vin.substring(11);
    
    // البحث عن الماركة
    const manufacturer = WMI_DATABASE[wmi] || null;
    
    if (!manufacturer) {
        return { 
            error: null,
            found: false,
            make: 'غير معروف',
            makeEn: 'Unknown',
            icon: '❓',
            message: 'الماركة غير مدعومة حالياً أو رقم الهيكل غير معروف'
        };
    }
    
    // تحديد السنة
    let year = YEAR_MAP[yearCode];
    if (!year) {
        // محاولة تخمين العقد
        const currentYear = new Date().getFullYear();
        const decade = Math.floor(currentYear / 10) * 10;
        year = 'غير معروف (قديم جداً أو مستقبلي)';
    }
    
    // نوع السيارة
    const vehicleTypeMap = {
        '1': 'سيارة ركاب',
        '2': 'سيارة ركاب',
        '3': 'نقل خفيف',
        '4': 'نقل ثقيل',
        '5': 'حافلة',
        '6': 'دراجة نارية',
    };
    const vehicleType = vehicleTypeMap[vin[3]] || 'سيارة';
    
    return {
        error: null,
        found: true,
        make: manufacturer.make,
        makeEn: manufacturer.makeEn,
        icon: manufacturer.icon,
        market: manufacturer.market,
        wmi: wmi,
        modelCode: modelCode,
        year: year,
        plantCode: plantCode,
        serial: serial,
        vehicleType: vehicleType
    };
}

// ==========================================
// 5. دالة البحث وعرض النتيجة
// ==========================================
async function searchVIN() {
    const vinInput = document.getElementById('vinInput');
    const errorMsg = document.getElementById('errorMsg');
    const resultBox = document.getElementById('resultBox');
    const loading = document.getElementById('loading');
    
    const vin = vinInput.value.trim();
    
    // إخفاء جميع النتائج السابقة
    errorMsg.style.display = 'none';
    resultBox.style.display = 'none';
    
    // التحقق من الإدخال
    if (!vin) {
        showError('الرجاء إدخال رقم الهيكل أولاً');
        vinInput.focus();
        return;
    }
    
    if (vin.length !== 17) {
        showError(`رقم الهيكل يجب أن يتكون من 17 خانة. أنت أدخلت ${vin.length} خانة`);
        return;
    }
    
    // إظهار مؤشر التحميل
    loading.style.display = 'block';
    
    // محاكاة تأخير بسيط (للشعور بالاحترافية)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // فك التشفير
    const result = decodeVIN(vin);
    
    // إخفاء التحميل
    loading.style.display = 'none';
    
    if (result.error) {
        showError(result.error);
        return;
    }
    
    if (!result.found) {
        showError(result.message || 'لم نتمكن من إيجاد الرقم الذي تبحث عنه أو أن الماركة غير مدعومة حالياً');
        return;
    }
    
    // عرض النتيجة
    showResult(result, vin);
}

// ==========================================
// 6. عرض رسالة الخطأ
// ==========================================
function showError(message) {
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
}

// ==========================================
// 7. عرض نتيجة البحث
// ==========================================
function showResult(data, vin) {
    const resultBox = document.getElementById('resultBox');
    const partsLink = getPartsLink(data.makeEn, vin);
    
    resultBox.innerHTML = `
        <div class="result-card">
            <div class="result-header">
                <span class="make-icon">${data.icon}</span>
                <span class="make-name">${data.make}</span>
            </div>
            
            <div class="result-details">
                <div class="detail-item">
                    <div class="label">🏭 بلد المنشأ</div>
                    <div class="value">${data.market}</div>
                </div>
                <div class="detail-item">
                    <div class="label">📅 سنة الموديل</div>
                    <div class="value">${data.year}</div>
                </div>
                <div class="detail-item">
                    <div class="label">🔢 كود الموديل</div>
                    <div class="value" style="font-family: monospace; direction: ltr;">${data.modelCode}</div>
                </div>
                <div class="detail-item">
                    <div class="label">🚗 نوع المركبة</div>
                    <div class="value">${data.vehicleType}</div>
                </div>
            </div>
            
            <a href="${partsLink}" target="_blank" class="parts-link">
                🔧 عرض قطع الغيار المتوافقة ←
            </a>
        </div>
    `;
    
    resultBox.style.display = 'block';
    
    // تمرير ناعم للنتيجة
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ==========================================
// 8. أحداث إضافية
// ==========================================

// البحث عند الضغط على Enter
document.getElementById('vinInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchVIN();
    }
});

// تحويل الحروف إلى كبيرة تلقائياً
document.getElementById('vinInput').addEventListener('input', function(e) {
    this.value = this.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
});

// تركيز المؤشر تلقائياً عند فتح الصفحة
window.addEventListener('load', function() {
    document.getElementById('vinInput').focus();
});
