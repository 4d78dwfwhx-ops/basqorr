"""
BASQOR - JEDDAH FIELD OPERATIONS ENGINE
VERSION: 2.0.0-JEDDAH
COVERS: QUWAIZAH, NORTH, SOUTH, EAST, CENTRAL
"""

import os
import math
import hashlib
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, asdict
from dotenv import load_dotenv

load_dotenv('config.env')


# =============================================
# 1. تعريف مناطق جدة
# =============================================

@dataclass
class JeddahDistrict:
    district_id: str
    name_ar: str
    name_en: str
    center_lat: float
    center_lng: float
    district_type: str
    population: int
    neighborhoods: List[str]
    active_mandoubs: int


JEDDAH_DISTRICTS = {
    "QUWAIZAH": JeddahDistrict(
        district_id="QUWAIZAH",
        name_ar="صناعية قويزة",
        name_en="Quwaizah Industrial",
        center_lat=21.4858,
        center_lng=39.1925,
        district_type="INDUSTRIAL",
        population=50000,
        neighborhoods=["قويزة", "الحرازات", "أم السلم"],
        active_mandoubs=45
    ),
    "NORTH": JeddahDistrict(
        district_id="NORTH",
        name_ar="شمال جدة",
        name_en="North Jeddah",
        center_lat=21.7136,
        center_lng=39.1533,
        district_type="RESIDENTIAL",
        population=1200000,
        neighborhoods=["السلامة", "الروضة", "الزهراء", "المشرفة", "النعيم", "المرجان"],
        active_mandoubs=25
    ),
    "SOUTH": JeddahDistrict(
        district_id="SOUTH",
        name_ar="جنوب جدة",
        name_en="South Jeddah",
        center_lat=21.3869,
        center_lng=39.2256,
        district_type="RESIDENTIAL",
        population=900000,
        neighborhoods=["الجامعة", "السليمانية", "الأجواد", "السنابل", "المليساء"],
        active_mandoubs=20
    ),
    "EAST": JeddahDistrict(
        district_id="EAST",
        name_ar="شرق جدة",
        name_en="East Jeddah",
        center_lat=21.5433,
        center_lng=39.2728,
        district_type="MIXED",
        population=800000,
        neighborhoods=["الصفا", "المنار", "المروة", "الفيحاء", "الربوة"],
        active_mandoubs=18
    ),
    "CENTRAL": JeddahDistrict(
        district_id="CENTRAL",
        name_ar="وسط جدة",
        name_en="Central Jeddah",
        center_lat=21.5433,
        center_lng=39.1728,
        district_type="COMMERCIAL",
        population=600000,
        neighborhoods=["البلد", "البغدادية", "الشرقية", "الهنداوية", "السبيل"],
        active_mandoubs=30
    )
}


# =============================================
# 2. قاعدة بيانات تشاليح قويزة
# =============================================

QUWAIZAH_SALVAGE_YARDS = [
    {
        "id": "SALV-JED-001",
        "name": "تشليح قويزة الرئيسي",
        "location": {"lat": 21.4858, "lng": 39.1925},
        "specialty": ["تويوتا", "لكزس"],
        "rating": 4.5,
        "total_reviews": 1250,
        "response_time_avg_minutes": 5,
        "phone": "0500000001",
        "working_hours": "8:00-22:00"
    },
    {
        "id": "SALV-JED-002",
        "name": "تشليح المنطقة الصناعية",
        "location": {"lat": 21.4801, "lng": 39.1889},
        "specialty": ["هيونداي", "كيا", "نيسان"],
        "rating": 4.3,
        "total_reviews": 890,
        "response_time_avg_minutes": 8,
        "phone": "0500000002",
        "working_hours": "7:00-23:00"
    },
    {
        "id": "SALV-JED-003",
        "name": "تشليح السيارات الأمريكية",
        "location": {"lat": 21.4902, "lng": 39.1956},
        "specialty": ["فورد", "شيفروليه", "جي إم سي", "كاديلاك"],
        "rating": 4.1,
        "total_reviews": 650,
        "response_time_avg_minutes": 10,
        "phone": "0500000003",
        "working_hours": "8:00-21:00"
    },
    {
        "id": "SALV-JED-004",
        "name": "تشليح السيارات الصينية",
        "location": {"lat": 21.4756, "lng": 39.1901},
        "specialty": ["شانجان", "جيلي", "جريت وول", "شيري"],
        "rating": 4.0,
        "total_reviews": 420,
        "response_time_avg_minutes": 12,
        "phone": "0500000004",
        "working_hours": "8:00-20:00"
    },
    {
        "id": "SALV-JED-005",
        "name": "تشليح السيارات الأوروبية",
        "location": {"lat": 21.4823, "lng": 39.1876},
        "specialty": ["مرسيدس", "بي إم دبليو", "أودي", "فولكس واجن"],
        "rating": 4.4,
        "total_reviews": 720,
        "response_time_avg_minutes": 7,
        "phone": "0500000005",
        "working_hours": "9:00-21:00"
    }
]


# =============================================
# 3. محرك العمليات الميدانية
# =============================================

class JeddahOperationsEngine:
    """
    محرك العمليات الميدانية المتخصص لمدينة جدة
    يغطي: قويزة، شمال، جنوب، شرق، وسط
    """

    def __init__(self):
        self.city = os.getenv('PRIMARY_CITY', 'Jeddah')
        self.city_ar = os.getenv('PRIMARY_CITY_NAME_AR', 'جدة')
        self.industrial_zone = os.getenv('PRIMARY_INDUSTRIAL_ZONE', 'QUWAIZAH')
        self.max_delivery_radius = float(os.getenv('MAX_DELIVERY_RADIUS_KM', 30))
        self.target_delivery_minutes = int(os.getenv('TARGET_DELIVERY_MINUTES', 40))
        self.free_delivery_threshold = float(os.getenv('FREE_DELIVERY_THRESHOLD_SAR', 300))
        self.delivery_fee_per_km = float(os.getenv('DELIVERY_FEE_PER_KM', 2.00))

        # أسعار التوصيل بين المناطق
        self.delivery_pricing = {
            "QUWAIZAH_TO_NORTH": 35.00,
            "QUWAIZAH_TO_SOUTH": 30.00,
            "QUWAIZAH_TO_EAST": 25.00,
            "QUWAIZAH_TO_CENTRAL": 20.00,
            "WITHIN_QUWAIZAH": 15.00,
            "INTER_DISTRICT": 20.00
        }

    # ==========================================
    # تحديد موقع العميل
    # ==========================================

    def locate_customer_district(self, lat: float, lng: float) -> Dict:
        """تحديد منطقة العميل من الإحداثيات"""
        closest = None
        min_distance = float('inf')

        for dist_id, dist in JEDDAH_DISTRICTS.items():
            distance = self._haversine_distance(lat, lng, dist.center_lat, dist.center_lng)
            if distance < min_distance:
                min_distance = distance
                closest = dist

        return {
            "district_id": closest.district_id,
            "district_name_ar": closest.name_ar,
            "district_center": {"lat": closest.center_lat, "lng": closest.center_lng},
            "distance_to_center_km": round(min_distance, 1)
        }

    # ==========================================
    # البحث عن أقرب تشليح
    # ==========================================

    def find_nearest_salvage_yards(
        self,
        part_name: str = "",
        customer_location: Dict = None,
        vehicle_brand: str = "",
        limit: int = 5
    ) -> List[Dict]:
        """البحث عن أقرب تشاليح قويزة المتوفرة"""
        if not customer_location:
            customer_location = {"lat": 21.5433, "lng": 39.1728}

        results = []

        for yard in QUWAIZAH_SALVAGE_YARDS:
            distance = self._haversine_distance(
                customer_location["lat"], customer_location["lng"],
                yard["location"]["lat"], yard["location"]["lng"]
            )

            # حساب وقت التوصيل
            delivery = self.calculate_delivery_time(
                yard["location"], customer_location
            )

            # مطابقة تخصص التشليح مع ماركة السيارة
            brand_match = True
            if vehicle_brand:
                brand_match = vehicle_brand in yard["specialty"]

            results.append({
                **yard,
                "distance_km": round(distance, 1),
                "estimated_delivery_minutes": delivery["estimated_minutes"],
                "delivery_fee": self.calculate_delivery_fee(
                    "QUWAIZAH",
                    self.locate_customer_district(
                        customer_location["lat"], customer_location["lng"]
                    )["district_id"]
                ),
                "brand_match": brand_match,
                "is_open": self._is_yard_open(yard["working_hours"])
            })

        # ترتيب حسب المسافة
        results.sort(key=lambda x: x["distance_km"])

        # إعطاء أولوية للتشاليح المطابقة للماركة
        brand_matched = [r for r in results if r["brand_match"] and r["is_open"]]
        others = [r for r in results if not r["brand_match"] or not r["is_open"]]

        sorted_results = brand_matched + others

        return sorted_results[:limit]

    # ==========================================
    # حساب وقت التوصيل
    # ==========================================

    def calculate_delivery_time(self, pickup: Dict, dropoff: Dict) -> Dict:
        """حساب وقت التوصيل المتوقع في جدة"""
        distance_km = self._haversine_distance(
            pickup["lat"], pickup["lng"],
            dropoff["lat"], dropoff["lng"]
        )

        # متوسط السرعة حسب الزحام
        if self._is_rush_hour():
            avg_speed_kmh = 25
            traffic_status = "زحام"
        else:
            avg_speed_kmh = 45
            traffic_status = "طبيعي"

        travel_time = (distance_km / avg_speed_kmh) * 60
        loading_time = 10
        delivery_time = 5
        total_time = travel_time + loading_time + delivery_time

        return {
            "distance_km": round(distance_km, 1),
            "estimated_minutes": round(total_time),
            "traffic_status": traffic_status,
            "is_rush_hour": self._is_rush_hour(),
            "feasible": distance_km <= self.max_delivery_radius,
            "breakdown": {
                "travel_minutes": round(travel_time),
                "loading_minutes": loading_time,
                "delivery_minutes": delivery_time
            }
        }

    # ==========================================
    # حساب رسوم التوصيل
    # ==========================================

    def calculate_delivery_fee(
        self,
        pickup_zone: str = "QUWAIZAH",
        dropoff_zone: str = "CENTRAL",
        urgency: str = "normal",
        order_amount: float = 0
    ) -> Dict:
        """حساب رسوم التوصيل في جدة"""
        zone_key = f"{pickup_zone}_TO_{dropoff_zone}"
        base_fee = self.delivery_pricing.get(zone_key, self.delivery_pricing["INTER_DISTRICT"])

        # توصيل مجاني للطلبات الكبيرة
        if order_amount >= self.free_delivery_threshold:
            return {
                "base_fee": base_fee,
                "final_fee": 0.00,
                "is_free": True,
                "reason": f"توصيل مجاني للطلبات فوق {self.free_delivery_threshold} ريال"
            }

        surcharges = []
        final_fee = base_fee

        # رسوم وقت الذروة
        if self._is_rush_hour():
            rush_surcharge = round(base_fee * float(os.getenv('RUSH_HOUR_SURCHARGE', 0.30)), 2)
            final_fee += rush_surcharge
            surcharges.append({"type": "وقت الذروة", "amount": rush_surcharge})

        # رسوم الطلبات المستعجلة
        if urgency == "urgent":
            urgent_surcharge = round(base_fee * float(os.getenv('URGENT_ORDER_SURCHARGE', 0.50)), 2)
            final_fee += urgent_surcharge
            surcharges.append({"type": "مستعجل", "amount": urgent_surcharge})
        elif urgency == "emergency":
            emergency_surcharge = round(base_fee * float(os.getenv('EMERGENCY_ORDER_SURCHARGE', 1.00)), 2)
            final_fee += emergency_surcharge
            surcharges.append({"type": "طارئ", "amount": emergency_surcharge})

        return {
            "base_fee": base_fee,
            "surcharges": surcharges,
            "final_fee": round(final_fee, 2),
            "is_free": False,
            "pickup_zone": pickup_zone,
            "dropoff_zone": dropoff_zone
        }

    # ==========================================
    # المناديب النشطين
    # ==========================================

    def get_active_mandoubs_in_zone(self, zone: str) -> int:
        """عدد المناديب النشطين في منطقة معينة"""
        district = JEDDAH_DISTRICTS.get(zone)
        return district.active_mandoubs if district else 10

    def get_total_active_mandoubs(self) -> int:
        """إجمالي المناديب النشطين في جدة"""
        return sum(d.active_mandoubs for d in JEDDAH_DISTRICTS.values())

    # ==========================================
    # تقدير إمكانية تنفيذ الطلب
    # ==========================================

    def estimate_order_fulfillment(self, part_name: str, customer_zone: str) -> Dict:
        """تقدير إمكانية تنفيذ الطلب"""
        mandoubs_available = self.get_active_mandoubs_in_zone(customer_zone)

        if mandoubs_available >= 20:
            response_time = "5-10 دقائق"
            success_probability = 0.95
        elif mandoubs_available >= 10:
            response_time = "10-20 دقائق"
            success_probability = 0.85
        elif mandoubs_available >= 5:
            response_time = "20-30 دقائق"
            success_probability = 0.70
        else:
            response_time = "30-45 دقيقة"
            success_probability = 0.50

        return {
            "zone": customer_zone,
            "zone_name_ar": JEDDAH_DISTRICTS[customer_zone].name_ar if customer_zone in JEDDAH_DISTRICTS else "غير معروف",
            "mandoubs_available": mandoubs_available,
            "estimated_response_time": response_time,
            "success_probability": success_probability,
            "can_fulfill": mandoubs_available > 0
        }

    # ==========================================
    # إحصائيات جدة
    # ==========================================

    def get_jeddah_stats(self) -> Dict:
        """إحصائيات عمليات جدة"""
        total_population = sum(d.population for d in JEDDAH_DISTRICTS.values())
        total_yards = len(QUWAIZAH_SALVAGE_YARDS)
        total_mandoubs = self.get_total_active_mandoubs()

        return {
            "city": self.city_ar,
            "total_population": total_population,
            "total_districts": len(JEDDAH_DISTRICTS),
            "industrial_zones": 1,
            "total_salvage_yards": total_yards,
            "total_active_mandoubs": total_mandoubs,
            "max_delivery_radius_km": self.max_delivery_radius,
            "target_delivery_minutes": self.target_delivery_minutes,
            "free_delivery_threshold": self.free_delivery_threshold,
            "is_rush_hour": self._is_rush_hour(),
            "current_time": datetime.now().strftime("%H:%M"),
            "districts": [
                {
                    "name": d.name_ar,
                    "population": d.population,
                    "active_mandoubs": d.active_mandoubs
                }
                for d in JEDDAH_DISTRICTS.values()
            ]
        }

    # ==========================================
    # أدوات مساعدة
    # ==========================================

    def _haversine_distance(self, lat1: float, lng1: float, lat2: float, lng2: float) -> float:
        """حساب المسافة بالكيلومتر"""
        R = 6371
        dlat = math.radians(lat2 - lat1)
        dlng = math.radians(lng2 - lng1)
        a = (
            math.sin(dlat / 2) ** 2 +
            math.cos(math.radians(lat1)) *
            math.cos(math.radians(lat2)) *
            math.sin(dlng / 2) ** 2
        )
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c

    def _is_rush_hour(self) -> bool:
        """تحديد وقت الذروة في جدة"""
        now = datetime.now()
        hour = now.hour
        weekday = now.weekday()

        # الجمعة والسبت ما فيها ذروة
        if weekday in [4, 5]:
            return False

        # أوقات الذروة
        morning_rush = 7 <= hour <= 9
        evening_rush = 16 <= hour <= 19

        return morning_rush or evening_rush

    def _is_yard_open(self, working_hours: str) -> bool:
        """التحقق من أن التشليح مفتوح"""
        try:
            open_time, close_time = working_hours.split("-")
            open_hour, open_min = map(int, open_time.split(":"))
            close_hour, close_min = map(int, close_time.split(":"))

            now = datetime.now()
            open_dt = now.replace(hour=open_hour, minute=open_min)
            close_dt = now.replace(hour=close_hour, minute=close_min)

            return open_dt <= now <= close_dt
        except:
            return True


# =============================================
# اختبار سريع
# =============================================
if __name__ == "__main__":
    engine = JeddahOperationsEngine()

    print("=" * 60)
    print("BASQOR JEDDAH OPERATIONS ENGINE")
    print("=" * 60)

    # إحصائيات جدة
    stats = engine.get_jeddah_stats()
    print(f"\n🏙️ المدينة: {stats['city']}")
    print(f"👥 السكان: {stats['total_population']:,}")
    print(f"🏭 التشاليح: {stats['total_salvage_yards']}")
    print(f"🛵 المناديب: {stats['total_active_mandoubs']}")
    print(f"🕐 وقت الذروة: {'نعم' if stats['is_rush_hour'] else 'لا'}")

    # تحديد موقع
    location = engine.locate_customer_district(21.7136, 39.1533)
    print(f"\n📍 الموقع: {location['district_name_ar']}")

    # أقرب تشليح
    yards = engine.find_nearest_salvage_yards(
        vehicle_brand="تويوتا",
        customer_location={"lat": 21.7136, "lng": 39.1533}
    )
    print(f"\n🔧 أقرب تشليح: {yards[0]['name']}")
    print(f"📏 المسافة: {yards[0]['distance_km']} كم")
    print(f"⏱️ التوصيل: {yards[0]['estimated_delivery_minutes']} دقيقة")
    print(f"💰 رسوم التوصيل: {yards[0]['delivery_fee']} ريال")

    # إمكانية التنفيذ
    fulfillment = engine.estimate_order_fulfillment("فحمات", "NORTH")
    print(f"\n📊 احتمالية النجاح: {fulfillment['success_probability'] * 100:.0f}%")