import { indexOfLeastValue } from "../utils/array";
import type { Item, Source } from "./types";

/**
 * Aggregate several sources, return their items sorted from the latest one.
 * The sources themselves are expected to be sorted from latest to oldest.
 */
export class TimeFeed implements Source {
  constructor(public sources: Source[]) {}

  async *[Symbol.asyncIterator]() {
    const iterators = this.sources.map((s) => s[Symbol.asyncIterator]());
    const lastResults = await Promise.all(iterators.map((it) => it.next()));
    console.log(lastResults);

    // while at least one source still has items
    while (lastResults.some((r) => !r.done)) {
      // find the freshest item
      const latestIndex = indexOfLeastValue(lastResults, (r) =>
        r.done ? Infinity : -r.value.published
      );

      console.log('latestIndex', latestIndex);

      // yield the freshest item
      yield lastResults[latestIndex].value as Item;

      // get the next item from the corresponding iterator
      lastResults[latestIndex] = await iterators[latestIndex].next();
    }
  }
}
