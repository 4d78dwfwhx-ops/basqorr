export function smartSearch(query: string, items: any[]): any[] {
  const queryLower = query.toLowerCase();
  return items.map((item) => {
    let score = 0;
    if (item.name.toLowerCase().includes(queryLower)) { score += 10; if (item.name.toLowerCase().startsWith(queryLower)) score += 5; }
    if (item.description.toLowerCase().includes(queryLower)) score += 3;
    if (item.brand.toLowerCase().includes(queryLower)) score += 7;
    if (item.category.toLowerCase().includes(queryLower)) score += 5;
    score += item.rating * 0.5;
    score += Math.log(item.reviewCount + 1) * 0.3;
    return { ...item, score };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score);
}

export function getRecommendations(userHistory: string[], allItems: any[]): any[] {
  const userCategories = new Set(userHistory);
  return allItems.filter((item) => userCategories.has(item.category)).sort((a, b) => b.rating - a.rating).slice(0, 10);
}

export function sortByDistance(items: any[], userLocation: { lat: number; lng: number }): any[] {
  return items.map((item) => {
    const distance = calculateDistance(userLocation.lat, userLocation.lng, item.location.lat, item.location.lng);
    return { ...item, distance };
  }).sort((a, b) => a.distance - b.distance);
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)*Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
function toRad(deg: number): number { return deg * (Math.PI/180); }

export function decodeVIN(vin: string): any {
  if (vin.length !== 17) return null;
  return { manufacturer: getManufacturer(vin[0]), country: getCountry(vin[0]), year: getYear(vin[9]), plant: vin[10], serial: vin.slice(11) };
}
function getManufacturer(code: string): string {
  const m: Record<string,string> = {'J':'تويوتا','K':'هيونداي/كيا','1':'فورد/شيفروليه','W':'مرسيدس/بي ام دبليو','S':'نيسان'};
  return m[code] || 'غير معروف';
}
function getCountry(code: string): string {
  const c: Record<string,string> = {'J':'اليابان','K':'كوريا','1':'الولايات المتحدة','W':'ألمانيا','S':'بريطانيا'};
  return c[code] || 'غير معروف';
}
function getYear(code: string): number {
  const y: Record<string,number> = {'A':2010,'B':2011,'C':2012,'D':2013,'E':2014,'F':2015,'G':2016,'H':2017,'J':2018,'K':2019,'L':2020,'M':2021,'N':2022,'P':2023,'R':2024,'S':2025,'T':2026};
  return y[code] || 2020;
}
