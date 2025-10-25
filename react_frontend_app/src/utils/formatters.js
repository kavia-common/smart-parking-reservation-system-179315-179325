export function formatCurrency(n) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n || 0);
  } catch {
    return `$${(n || 0).toFixed(2)}`;
  }
}
export function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleString();
}
