import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nth = (n: number) =>
  ['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th';

export const numNth = (n: number) => `${n}${nth(n)}`;
