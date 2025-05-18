import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const isObject = (value: unknown): boolean => {
	return value !== null && typeof value === "object" && !Array.isArray(value);
};
