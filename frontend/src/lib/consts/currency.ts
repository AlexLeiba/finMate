export const CURRENCIES = [
  { label: "€ EUR", value: "EUR", symbol: "€" },
  { label: "$ USD", value: "USD", symbol: "$" },
  { label: "£ GBP", value: "GBP", symbol: "£" },
  { label: "¥ JPY", value: "JPY", symbol: "¥" },
  { label: "¥ CNY", value: "CNY", symbol: "¥" },
  { label: "₹ INR", value: "INR", symbol: "₹" },
  { label: "C$ CAD", value: "CAD", symbol: "C$" },
  { label: "A$ AUD", value: "AUD", symbol: "A$" },
  { label: "CHF CHF", value: "CHF", symbol: "CHF" },
  { label: "lei RON", value: "RON", symbol: "lei" },
] as const;

export const DEFAULT_CURRENCY = CURRENCIES[1].value;

export const CURRENCY_SYMBOLS = CURRENCIES.reduce(
  (acc, curr) => {
    acc[curr.value] = curr.symbol;
    return acc;
  },
  {} as Record<string, string>,
);

export type CurrencyType = (typeof CURRENCIES)[number]["value"];
