export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 0, // Minimum of 0 decimal places
  maximumFractionDigits: 2, // Maximum of 2 decimal places
});

export function formatCurrency(number) {
  if (Number.isInteger(number)) {
    // If it's an integer, format without decimals
    return CURRENCY_FORMATTER.format(Math.round(number)); // rounding to avoid any floating-point inaccuracies
  } else {
    // If it's a float, format with up to 2 decimal places
    return CURRENCY_FORMATTER.format(number);
  }
}
