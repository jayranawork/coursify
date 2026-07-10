export function truncate(value, length = 120) {
  if (!value) return "";
  return value.length > length ? `${value.slice(0, length).trim()}...` : value;
}
