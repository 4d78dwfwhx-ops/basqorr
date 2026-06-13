"""
BASQORR - نظام API المناديب (Mandoub Service)
مشابه لنظام مرسول ولكن متخصص في قطع غيار السيارات
يدعم: البحث عن قطع، تقديم العروض، التتبع المباشر
"""

from fastapi import FastAPI, HTTPException, Query, Body
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid
import math

app = FastAPI(title="BASQORR Mandoub API", version="1.0.0")

# ==========================================
# 1. النماذج (Models)
# ==========================================

class MandoubRequest(BaseModel):
    """طلب العميل للمندوب"""
    customer_id: str
    vin: str = Field(..., min_length=17, max_length=17, description="رقم الهيكل")
    part_name: str = Field(..., description="اسم القطعة المطلوبة")
    part_type: str = Field(..., description="نوع القطعة: جديد، مستعمل، تجاري")
    location_lat: float = Field(..., ge=-90, le=90)
    location_lng: float = Field(..., ge=-180, le=180)
    max_budget: float = Field(..., gt=0, description="الميزانية القصوى")
    urgency: str = Field("normal", description="عادي، مستعجل، طارئ")
    notes: Optional[str] = None

class MandoubOffer(BaseModel):
    """عرض سعر من المندوب"""
    mandoub_id: str
    request_id: str
    service_fee: float = Field(..., gt=0, description="رسوم خدمة البحث والتوصيل")
    estimated_time: int = Field(..., gt=0, description="الوقت المتوقع بالدقائق")
    notes: Optional[str] = None

class MandoubLocation(BaseModel):
    """موقع المندوب الحالي"""
    mandoub_id: str
    lat: float
    lng: float
    status: str = "available"  # available, busy, offline

# ==========================================
# 2. قاعدة بيانات مؤقتة (للتطوير)
# ==========================================

requests_db = {}  # تخزين طلبات العملاء
offers_db = {}    # تخزين عروض المناديب
mandoub_locations = {}  # مواقع المناديب

# ==========================================
# 3. حساب المسافة بين نقطتين (GPS)
# ==========================================

def haversine_distance(lat1, lng1, lat2, lng2):
    """حساب المسافة بالكيلومتر بين موقعين"""
    R = 6371  # نصف قطر الأرض
    dlat = math.radians(lat2 - lat1)
    dlng = math.radians(lng2 - lng1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlng/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c

# ==========================================
# 4. نقاط API
# ==========================================

@app.post("/api/v1/mandoub/request", tags=["طلبات المناديب"])
async def create_request(req: MandoubRequest):
    """
    إنشاء طلب جديد للبحث عن قطعة.
    يظهر الطلب لجميع المناديب القريبين.
    """
    request_id = str(uuid.uuid4())[:8]
    
    request_data = {
        "request_id": request_id,
        "customer_id": req.customer_id,
        "vin": req.vin,
        "part_name": req.part_name,
        "part_type": req.part_type,
        "location": {"lat": req.location_lat, "lng": req.location_lng},
        "max_budget": req.max_budget,
        "urgency": req.urgency,
        "notes": req.notes,
        "status": "pending",  # pending, assigned, in_progress, completed, cancelled
        "created_at": datetime.now().isoformat(),
        "offers": []
    }
    
    requests_db[request_id] = request_data
    
    # البحث عن مناديب قريبين (نصف قطر 10 كم)
    nearby_mandoubs = []
    for m_id, m_loc in mandoub_locations.items():
        distance = haversine_distance(req.location_lat, req.location_lng, m_loc["lat"], m_loc["lng"])
        if distance <= 10 and m_loc["status"] == "available":
            nearby_mandoubs.append({
                "mandoub_id": m_id,
                "distance_km": round(distance, 2),
                "current_location": m_loc
            })
    
    return {
        "success": True,
        "request_id": request_id,
        "nearby_mandoubs": nearby_mandoubs,
        "message": f"تم إنشاء الطلب بنجاح. يوجد {len(nearby_mandoubs)} مندوب قريب منك."
    }

@app.post("/api/v1/mandoub/offer", tags=["عروض المناديب"])
async def submit_offer(offer: MandoubOffer):
    """
    المندوب يقدم عرض سعره للعميل.
    يتضمن رسوم الخدمة والوقت المتوقع.
    """
    if offer.request_id not in requests_db:
        raise HTTPException(status_code=404, detail="الطلب غير موجود")
    
    if offer.request_id not in offers_db:
        offers_db[offer.request_id] = []
    
    offer_data = {
        "offer_id": str(uuid.uuid4())[:8],
        "mandoub_id": offer.mandoub_id,
        "service_fee": offer.service_fee,
        "estimated_time": offer.estimated_time,
        "notes": offer.notes,
        "created_at": datetime.now().isoformat(),
        "status": "pending"
    }
    
    offers_db[offer.request_id].append(offer_data)
    requests_db[offer.request_id]["offers"].append(offer_data)
    
    return {
        "success": True,
        "offer_id": offer_data["offer_id"],
        "message": "تم تقديم العرض بنجاح. بانتظار قبول العميل."
    }

@app.get("/api/v1/mandoub/request/{request_id}", tags=["طلبات المناديب"])
async def get_request_offers(request_id: str):
    """
    العميل يشوف جميع عروض المناديب على طلبه.
    مرتبة من الأقل سعراً.
    """
    if request_id not in requests_db:
        raise HTTPException(status_code=404, detail="الطلب غير موجود")
    
    request_data = requests_db[request_id]
    offers = sorted(offers_db.get(request_id, []), key=lambda x: x["service_fee"])
    
    return {
        "success": True,
        "request": request_data,
        "offers": offers,
        "total_offers": len(offers),
        "lowest_offer": offers[0]["service_fee"] if offers else None
    }

@app.post("/api/v1/mandoub/accept-offer", tags=["قبول العروض"])
async def accept_offer(request_id: str = Body(...), offer_id: str = Body(...)):
    """
    العميل يقبل عرض مندوب معين.
    يتم تعيين الطلب لهذا المندوب وإشعاره.
    """
    if request_id not in requests_db:
        raise HTTPException(status_code=404, detail="الطلب غير موجود")
    
    if request_id not in offers_db:
        raise HTTPException(status_code=404, detail="لا توجد عروض لهذا الطلب")
    
    # البحث عن العرض المحدد
    selected_offer = None
    for offer in offers_db[request_id]:
        if offer["offer_id"] == offer_id:
            selected_offer = offer
            offer["status"] = "accepted"
            break
    
    if not selected_offer:
        raise HTTPException(status_code=404, detail="العرض غير موجود")
    
    # تحديث حالة الطلب
    requests_db[request_id]["status"] = "assigned"
    requests_db[request_id]["assigned_mandoub"] = selected_offer["mandoub_id"]
    requests_db[request_id]["agreed_fee"] = selected_offer["service_fee"]
    requests_db[request_id]["assigned_at"] = datetime.now().isoformat()
    
    return {
        "success": True,
        "message": "تم قبول العرض وتعيين المندوب. يمكنك متابعته الآن.",
        "mandoub_id": selected_offer["mandoub_id"],
        "agreed_fee": selected_offer["service_fee"],
        "estimated_time": selected_offer["estimated_time"]
    }

@app.put("/api/v1/mandoub/location", tags=["تتبع المناديب"])
async def update_location(loc: MandoubLocation):
    """
    تحديث موقع المندوب المباشر.
    يستخدم في التتبع الحي للعميل.
    """
    mandoub_locations[loc.mandoub_id] = {
        "lat": loc.lat,
        "lng": loc.lng,
        "status": loc.status,
        "last_update": datetime.now().isoformat()
    }
    
    return {
        "success": True,
        "message": "تم تحديث الموقع"
    }

@app.get("/api/v1/mandoub/track/{mandoub_id}", tags=["تتبع المناديب"])
async def track_mandoub(mandoub_id: str):
    """
    العميل يتتبع موقع المندوب في الوقت الحقيقي.
    """
    if mandoub_id not in mandoub_locations:
        raise HTTPException(status_code=404, detail="المندوب غير متصل حالياً")
    
    return {
        "success": True,
        "mandoub_id": mandoub_id,
        "location": mandoub_locations[mandoub_id]
    }

@app.get("/api/v1/mandoub/nearby", tags=["مناديب قريبين"])
async def get_nearby_mandoubs(lat: float = Query(...), lng: float = Query(...), radius: float = Query(10)):
    """
    عرض المناديب المتاحين حول موقع معين.
    """
    nearby = []
    for m_id, m_loc in mandoub_locations.items():
        distance = haversine_distance(lat, lng, m_loc["lat"], m_loc["lng"])
        if distance <= radius and m_loc["status"] == "available":
            nearby.append({
                "mandoub_id": m_id,
                "distance_km": round(distance, 2),
                "last_update": m_loc["last_update"]
            })
    
    return {
        "success": True,
        "count": len(nearby),
        "mandoubs": sorted(nearby, key=lambda x: x["distance_km"])
    }

# ==========================================
# 5. إحصائيات المنصة
# ==========================================

@app.get("/api/v1/mandoub/stats", tags=["إحصائيات"])
async def get_stats():
    """إحصائيات عامة للمنصة"""
    return {
        "total_requests": len(requests_db),
        "total_offers": sum(len(v) for v in offers_db.values()),
        "active_mandoubs": len([m for m in mandoub_locations.values() if m["status"] == "available"]),
        "completed_requests": len([r for r in requests_db.values() if r["status"] == "completed"])
    }

# ==========================================
# تشغيل الخادم
# ==========================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
