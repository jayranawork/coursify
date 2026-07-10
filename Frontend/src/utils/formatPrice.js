export function formatPrice(amount, currency = "INR") {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) {
    return "-";
  }

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(Number(amount));
  } catch {
    return `${currency} ${Number(amount).toLocaleString("en-IN")}`;
  }
}
