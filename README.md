<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="بازقر - ابحث عن قطع غيار سيارتك برقم الهيكل. دعم جميع الماركات في السعودية">
    <meta name="keywords" content="قطع غيار, رقم الهيكل, VIN, سيارات, السعودية, بازقر">
    <meta name="author" content="BASQORR">
    <title>بازقر | البحث عن قطع الغيار برقم الهيكل - جميع الماركات</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- شريط التنقل العلوي -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">
                <span class="logo-icon">🚗</span>
                <span class="logo-text">بازقر</span>
            </div>
            <div class="nav-links">
                <a href="#" class="active">الرئيسية</a>
                <a href="#">عن بازقر</a>
                <a href="#">تواصل معنا</a>
            </div>
        </div>
    </nav>

    <!-- القسم الرئيسي -->
    <main class="main-content">
        <div class="hero">
            <h1>ابحث عن قطع غيار سيارتك برقم الهيكل</h1>
            <p class="hero-subtitle">جميع الماركات المتوفرة في السعودية. أدخل رقم الهيكل المكون من 17 خانة</p>
            
            <!-- صندوق البحث -->
            <div class="search-container">
                <div class="search-box">
                    <div class="input-wrapper">
                        <input 
                            type="text" 
                            id="vinInput" 
                            placeholder="أدخل رقم الهيكل (VIN)" 
                            maxlength="17"
                            autocomplete="off"
                        >
                        <button onclick="searchVIN()" class="search-btn">
                            <span>🔍</span>
                            <span>بحث</span>
                        </button>
                    </div>
                </div>
                
                <!-- رسالة الخطأ -->
                <div class="error-msg" id="errorMsg"></div>
                
                <!-- مؤشر التحميل -->
                <div class="loading" id="loading">
                    <div class="spinner"></div>
                    <p>جاري البحث...</p>
                </div>
                
                <!-- صندوق النتيجة -->
                <div class="result-box" id="resultBox"></div>
            </div>

            <!-- الماركات المدعومة -->
            <div class="brands-section">
                <h3>الماركات المدعومة</h3>
                <div class="brands-grid">
                    <span class="brand-tag">تويوتا</span>
                    <span class="brand-tag">لكزس</span>
                    <span class="brand-tag">هيونداي</span>
                    <span class="brand-tag">كيا</span>
                    <span class="brand-tag">نيسان</span>
                    <span class="brand-tag">هوندا</span>
                    <span class="brand-tag">مازدا</span>
                    <span class="brand-tag">فورد</span>
                    <span class="brand-tag">شيفروليه</span>
                    <span class="brand-tag">جي إم سي</span>
                    <span class="brand-tag">مرسيدس</span>
                    <span class="brand-tag">بي إم دبليو</span>
                    <span class="brand-tag">أودي</span>
                    <span class="brand-tag">فولكس واجن</span>
                    <span class="brand-tag">رينو</span>
                    <span class="brand-tag">ميتسوبيشي</span>
                    <span class="brand-tag">سوزوكي</span>
                    <span class="brand-tag">شانجان</span>
                    <span class="brand-tag">جاك</span>
                    <span class="brand-tag">جريت وول</span>
                </div>
            </div>
        </div>
    </main>

    <!-- تذييل الصفحة -->
    <footer class="footer">
        <div class="footer-container">
            <p>© 2024 <strong>بازقر</strong> - جميع الحقوق محفوظة</p>
            <p class="footer-sub">النظام البيئي الرقمي لقطاع المركبات في السعودية</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
