export default function findLastIndex<T>(
  items: readonly T[],
  predicate: (item: T) => boolean,
): number | null {
  for (let index = items.length - 1; index >= 0; index--) {
    if (predicate(items[index]!)) {
      return index;
    }
  }

  return null;
}
