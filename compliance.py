"""
BASQOR - COMPLIANCE & ANTI-FRAUD ENGINE
VERSION: 2.0.0-JEDDAH
SAUDI REGULATORY COMPLIANCE (SDAIA + MINISTRY OF COMMERCE)
"""

import os
import hashlib
import hmac
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
from dotenv import load_dotenv

load_dotenv('config.env')


class BasqorComplianceEngine:
    """
    محرك الامتثال القانوني السعودي
    - حماية البيانات الشخصية (سدايا - PDPL)
    - الامتثال لوزارة التجارة
    - مكافحة الاحتيال والالتفاف
    """

    def __init__(self):
        self.encryption_key = os.getenv('ENCRYPTION_KEY', 'basqor-secure-key-2026')
        self.pdpl_mode = os.getenv('PDPL_COMPLIANCE_MODE', 'STRICT')
        self.anonymize_pii = os.getenv('ANONYMIZE_USER_PII', 'TRUE') == 'TRUE'
        self.encrypt_vin = os.getenv('ENCRYPT_VIN_AT_REST', 'TRUE') == 'TRUE'
        self.allowed_regions = os.getenv('ALLOWED_SERVER_REGIONS', 'sa-east-1,me-central-1,me-south-1').split(',')
        self.audit_retention_years = int(os.getenv('RETAIN_AUDIT_LOGS_YEARS', 10))
        self._audit_log: List[Dict] = []

    # ==========================================
    # 1. حماية البيانات الشخصية (سدايا - PDPL)
    # ==========================================

    def anonymize_user_data(self, user_data: Dict) -> Dict:
        """
        فصل معرفات المستخدم عن بيانات المركبات
        Data Anonymization per PDPL Article 12
        """
        if not self.anonymize_pii:
            return user_data

        sensitive_fields = ['national_id', 'iqama', 'phone', 'email', 'full_name']

        for field in sensitive_fields:
            if field in user_data and user_data[field]:
                user_data[f"{field}_hash"] = self._hash_sensitive(user_data[field])
                if field == 'phone':
                    user_data['phone_masked'] = f"****{user_data[field][-4:]}"
                elif field == 'national_id' or field == 'iqama':
                    user_data[f'{field}_masked'] = f"****{user_data[field][-4:]}"
                user_data[field] = None

        return user_data

    def encrypt_vin_at_rest(self, vin: str) -> str:
        """تشفير رقم الهيكل في قاعدة البيانات"""
        if not self.encrypt_vin:
            return vin
        return self._hash_sensitive(vin)

    def verify_data_residency(self, server_region: str) -> bool:
        """التحقق من أن البيانات داخل الحدود السعودية"""
        return server_region in self.allowed_regions

    def generate_consent_token(self, user_id: str, purpose: str) -> str:
        """توليد رمز موافقة المستخدم (PDPL Consent)"""
        data = f"{user_id}:{purpose}:{datetime.now().isoformat()}"
        return hmac.new(
            self.encryption_key.encode(),
            data.encode(),
            hashlib.sha256
        ).hexdigest()[:32]

    # ==========================================
    # 2. الامتثال لوزارة التجارة
    # ==========================================

    def get_commercial_registry_info(self) -> Dict:
        """معلومات السجل التجاري للعرض في API"""
        return {
            "commercial_registry_number": os.getenv('COMMERCIAL_REGISTRY_NUMBER', 'قيد التأسيس'),
            "business_center_verification": os.getenv('BUSINESS_CENTER_VERIFICATION_URL', ''),
            "tax_number": os.getenv('TAX_NUMBER', ''),
            "vat_rate": f"{float(os.getenv('VAT_RATE', 0.15)) * 100:.0f}%",
            "last_updated": datetime.now().isoformat(),
            "policies": {
                "return_policy": os.getenv('RETURN_POLICY_URL', '/legal/return-policy'),
                "privacy_policy": os.getenv('PRIVACY_POLICY_URL', '/legal/privacy-policy'),
                "terms_of_service": os.getenv('TERMS_OF_SERVICE_URL', '/legal/terms'),
                "refund_policy": os.getenv('REFUND_POLICY_URL', '/legal/refund-policy')
            }
        }

    def validate_merchant_registration(self, merchant_data: Dict) -> Tuple[bool, str]:
        """التحقق من صحة بيانات التاجر"""
        required_fields = ['commercial_registry', 'tax_number', 'bank_account']
        for field in required_fields:
            if not merchant_data.get(field):
                return False, f"المستند {field} مطلوب للتسجيل"
        return True, "تم التحقق بنجاح"

    # ==========================================
    # 3. مكافحة الاحتيال والالتفاف
    # ==========================================

    def mask_customer_phone(self, real_phone: str, transaction_id: str) -> str:
        """توليد رقم افتراضي مؤقت (VoIP Masking)"""
        if os.getenv('ENFORCE_VOIP_MASKING', 'TRUE') != 'TRUE':
            return real_phone
        masked = f"05{hashlib.md5(f'{transaction_id}:{real_phone}'.encode()).hexdigest()[:8]}"
        return masked

    def generate_installation_pin(self, order_id: str) -> str:
        """توليد رمز تأكيد التركيب (Two-Step Verification)"""
        pin = hashlib.sha256(
            f"INSTALL-{order_id}-{self.encryption_key}".encode()
        ).hexdigest()[:6].upper()
        return pin

    def verify_installation_pin(self, order_id: str, pin: str) -> bool:
        """التحقق من رمز التركيب"""
        expected = self.generate_installation_pin(order_id)
        return hmac.compare_digest(expected, pin.upper())

    def detect_circumvention_risk(
        self,
        mandoub_id: str,
        merchant_id: str,
        transaction_count: int,
        cancellation_rate: float,
        avg_call_duration_seconds: int
    ) -> Dict:
        """
        كشف محاولات الالتفاف باستخدام تحليل الأنماط
        """
        risk_score = 0.0
        flags = []

        if transaction_count > 10:
            risk_score += 0.30
            flags.append("تكرار عالي للمعاملات بين نفس الطرفين")

        if cancellation_rate > float(os.getenv('MAX_CANCELLATION_RATE_PER_MANDOUB', 0.10)):
            risk_score += 0.25
            flags.append("نسبة إلغاء مرتفعة")

        if avg_call_duration_seconds < 30:
            risk_score += 0.25
            flags.append("مكالمات قصيرة جداً - اشتباه تحويل خارج المنصة")

        if risk_score >= float(os.getenv('MIN_DISPUTE_SCORE_THRESHOLD', 0.75)):
            action = "BAN"
        elif risk_score >= 0.50:
            action = "SUSPEND"
        elif risk_score >= 0.30:
            action = "WARN"
        else:
            action = "NONE"

        return {
            "mandoub_id": mandoub_id,
            "merchant_id": merchant_id,
            "risk_score": round(risk_score, 2),
            "action": action,
            "flags": flags,
            "evaluated_at": datetime.now().isoformat()
        }

    def should_auto_ban(self, dispute_count: int) -> bool:
        """قرار الحظر التلقائي"""
        threshold = int(os.getenv('AUTO_BAN_AFTER_DISPUTES', 3))
        return dispute_count >= threshold

    # ==========================================
    # 4. سجل التدقيق (Audit Log)
    # ==========================================

    def log_audit_event(
        self,
        action: str,
        user_id: str,
        details: Dict,
        ip_address: str = "unknown"
    ) -> Dict:
        """تسجيل حدث تدقيق"""
        event = {
            "event_id": hashlib.sha256(
                f"{action}:{user_id}:{datetime.now().timestamp()}".encode()
            ).hexdigest()[:16],
            "timestamp": datetime.now().isoformat(),
            "action": action,
            "user_id_hash": self._hash_sensitive(user_id),
            "details": details,
            "ip_address": self._hash_sensitive(ip_address) if self.anonymize_pii else ip_address
        }
        self._audit_log.append(event)
        return event

    def get_audit_trail(self, user_id: str, days: int = 30) -> List[Dict]:
        """استخراج سجل التدقيق لمستخدم"""
        user_hash = self._hash_sensitive(user_id)
        cutoff = datetime.now() - timedelta(days=days)
        return [
            log for log in self._audit_log
            if log['user_id_hash'] == user_hash
            and datetime.fromisoformat(log['timestamp']) >= cutoff
        ]

    # ==========================================
    # 5. أدوات مساعدة
    # ==========================================

    def _hash_sensitive(self, data: str) -> str:
        """تشفير البيانات الحساسة"""
        if not data:
            return ""
        return hashlib.sha256(
            f"{data}:{self.encryption_key}".encode()
        ).hexdigest()

    def mask_document_number(self, doc_number: str) -> str:
        """إخفاء أرقام المستندات"""
        if len(doc_number) <= 4:
            return "****"
        return f"****{doc_number[-4:]}"


class BasqorDataRetention:
    """إدارة دورة حياة البيانات"""

    def __init__(self):
        self.retention_days = int(os.getenv('DATA_RETENTION_PERIOD_DAYS', 3650))

    def should_delete(self, created_at: datetime) -> bool:
        """هل يجب حذف البيانات؟"""
        age = datetime.now() - created_at
        return age.days > self.retention_days

    def get_deletion_date(self, created_at: datetime) -> datetime:
        """تاريخ الحذف المتوقع"""
        return created_at + timedelta(days=self.retention_days)


class BasqorFooterCompliance:
    """توليد نص الامتثال لتذييل الموقع"""

    @staticmethod
    def generate_footer_html() -> str:
        registry = BasqorComplianceEngine().get_commercial_registry_info()
        return f"""
        <footer class="basqor-compliance-footer">
            <div class="compliance-info">
                <p>© {datetime.now().year} BASQOR GROUP - جميع الحقوق محفوظة</p>
                <p>سجل تجاري: {registry['commercial_registry_number']}</p>
                <p>رقم ضريبي: {registry['tax_number']}</p>
            </div>
            <div class="compliance-links">
                <a href="{registry['policies']['return_policy']}">سياسة الاستبدال والاسترجاع</a>
                <a href="{registry['policies']['privacy_policy']}">سياسة الخصوصية</a>
                <a href="{registry['policies']['terms_of_service']}">شروط الخدمة</a>
            </div>
        </footer>
        """


if __name__ == "__main__":
    engine = BasqorComplianceEngine()

    # اختبار إخفاء البيانات
    user = {"full_name": "عبدالله محمد", "phone": "0512345678", "national_id": "1234567890"}
    anonymized = engine.anonymize_user_data(user)
    print("Anonymized User:", anonymized)

    # اختبار كشف الاحتيال
    risk = engine.detect_circumvention_risk("M001", "T001", 15, 0.20, 15)
    print("Risk Assessment:", risk)

    # اختبار رمز التركيب
    pin = engine.generate_installation_pin("BAS-2026-001")
    print("Installation PIN:", pin)
    print("PIN Verified:", engine.verify_installation_pin("BAS-2026-001", pin))