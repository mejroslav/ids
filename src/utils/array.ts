export function toArray<T>(iter: Iterable<T>): T[] {
  return [...iter];
}

export async function consumeAsync<T>(iter: AsyncIterable<T>): Promise<T[]> {
  let arr: T[] = [];
  for await (const el of iter) {
    arr.push(el);
  }
  return arr;
}

/** Find the smallest value in an array and return its index. */
export function indexOfLeastValue<T>(
  arr: T[],
  mapFn: (a: T) => number
): number {
  if (arr.length === 0) throw new TypeError("Cannot search in an empty array.");
  const nums = arr.map(mapFn);

  let leastValue: number | bigint | Date = nums[0];
  let correspondingIndex = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < leastValue) {
      leastValue = nums[i];
      correspondingIndex = i;
    }
  }

  return correspondingIndex;
}
