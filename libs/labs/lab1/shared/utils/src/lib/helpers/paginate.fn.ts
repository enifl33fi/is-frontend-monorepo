export function paginateFn<T>(arr: T[], size: number, page: number): T[] {
  const start = page * size;
  const end = start + size;

  return arr.slice(start, end);
}
