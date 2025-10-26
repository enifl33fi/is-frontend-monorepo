export function objectCompareFn(o1: unknown, o2: unknown) {
  return JSON.stringify(o1) === JSON.stringify(o2);
}
