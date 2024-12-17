export function prefixFilterFn(item: unknown, value: unknown): boolean {
  if (item && value) {
    return String(item).toLowerCase().startsWith(String(value).toLowerCase());
  }

  return !value;
}
