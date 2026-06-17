import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(price);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date));
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateSlug(text: string): string {
  return text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}
