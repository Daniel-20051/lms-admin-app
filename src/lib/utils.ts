import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Sanitizes a string by removing trailing quotes and whitespace
 * @param str - The string to sanitize
 * @returns The sanitized string
 */
export function sanitizeString(str: string | null | undefined): string {
  if (!str) return "";
  return str.trim().replace(/['"]+$/g, "").trim();
}

/**
 * Sanitizes and validates a currency code
 * @param currency - The currency code to sanitize
 * @param defaultCurrency - Default currency if invalid (default: "NGN")
 * @returns A valid 3-letter currency code
 */
export function sanitizeCurrency(
  currency: string | null | undefined,
  defaultCurrency: "NGN" | "USD" = "NGN"
): "NGN" | "USD" {
  if (!currency) return defaultCurrency;
  
  const sanitized = currency.trim().replace(/['"]/g, "").toUpperCase().slice(0, 3);
  
  // Only allow NGN or USD
  if (sanitized === "NGN" || sanitized === "USD") {
    return sanitized;
  }
  
  return defaultCurrency;
}

/**
 * Formats a number as currency with proper locale support
 * @param amount - The amount to format
 * @param currency - The currency code (NGN or USD)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number | string | null | undefined,
  currency: string | null | undefined = "NGN"
): string {
  if (amount === null || amount === undefined) return "N/A";
  
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(numAmount)) return "N/A";
  
  const validCurrency = sanitizeCurrency(currency);
  
  // Use appropriate locale for each currency
  const locale = validCurrency === "USD" ? "en-US" : "en-NG";
  
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: validCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numAmount);
  } catch (error) {
    // Fallback formatting
    const symbol = validCurrency === "USD" ? "$" : "₦";
    return `${symbol}${numAmount.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}