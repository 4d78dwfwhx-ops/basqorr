import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function classNames(...args: (string | boolean | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

// Arabic digits util (Western to Eastern Arabic)
export function toArabicNumeral(num: string | number) {
  return String(num).replace(/[0-9]/g, d => String.fromCharCode(d.charCodeAt(0) + 0x0660 - 0x0030));
}
