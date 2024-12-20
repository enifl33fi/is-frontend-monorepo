export function filterFn(item: unknown, value: unknown): boolean {
  if (item && value) {
    return String(item) === String(value);
  }

  return !value;
}
