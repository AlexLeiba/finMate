import { CURRENCY_SYMBOLS } from "@/lib/consts/currency";

const formatterCache = new Map<string, Intl.NumberFormat>();
const CURRENCY_LOCALES: Record<string, string> = {
  EUR: "de-DE",
  USD: "en-US",
  GBP: "en-GB",
  JPY: "ja-JP",
  CNY: "zh-CN",
  INR: "en-IN",
  CAD: "en-CA",
  AUD: "en-AU",
  CHF: "de-CH",
  RON: "ro-RO",
};

export function formatCurrency(amount: number | null | undefined, currency: string) {
  const normalizedCurrency = currency.toUpperCase();
  const value = amount ?? 0;

  try {
    let formatter = formatterCache.get(normalizedCurrency);
    if (!formatter) {
      formatter = new Intl.NumberFormat(CURRENCY_LOCALES[normalizedCurrency], {
        style: "currency",
        currency: normalizedCurrency,
      });
      formatterCache.set(normalizedCurrency, formatter);
    }

    return formatter
      .formatToParts(value)
      .map((part) =>
        part.type === "currency" ? CURRENCY_SYMBOLS[normalizedCurrency] || part.value : part.value
      )
      .join("");
  } catch {
    const symbol = CURRENCY_SYMBOLS[normalizedCurrency] || normalizedCurrency;
    return `${symbol} ${value.toLocaleString()}`;
  }
}
