export interface Product {
  id: string; name: string; description: string; brand: string; category: string;
  price: number; rating: number; reviewCount: number; inStock: boolean; image: string; score?: number;
}
export interface Workshop {
  id: string; name: string; description: string; rating: number; reviewCount: number;
  location: { lat: number; lng: number; city: string }; services: string[]; image: string;
}
export interface User { id: string; name: string; email: string; role: 'customer'|'merchant'|'admin'; avatar?: string; }
export interface Order { id: string; userId: string; products: Product[]; total: number; status: 'pending'|'processing'|'shipped'|'delivered'; createdAt: string; }
export interface SearchParams { query?: string; category?: string; minPrice?: number; maxPrice?: number; brand?: string; }
