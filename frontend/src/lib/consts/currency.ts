export const CURRENCIES = [
  { label: "€ EUR", value: "EUR" },
  { label: "$ USD", value: "USD" },
  { label: "£ GBP", value: "GBP" },
  { label: "¥ JPY", value: "JPY" },
  { label: "¥ CNY", value: "CNY" },
  { label: "₹ INR", value: "INR" },
  { label: "C$ CAD", value: "CAD" },
  { label: "A$ AUD", value: "AUD" },
  { label: "CHF CHF", value: "CHF" },
  { label: "lei RON", value: "RON" },
] as const;

export type CurrencyType = (typeof CURRENCIES)[number]["value"];
