import type { Item, Source } from "./types";
import { urlToDom } from "../utils/urlToDom";
import { toArray } from "../utils/array";

export class RssSource implements Source {
  constructor(public url: URL) {}

  async getItems(): Promise<Item[]> {
    const xmlDoc = await urlToDom(this.url, "text/xml");
    const itemElements = toArray(xmlDoc.querySelectorAll("item"));

    const profileImage = new URL(
      this.url.href.includes("zive.cz")
        ? "https://www.zive.cz/android-chrome-512x512.png"
        : "https://asset.stdout.cz/fe/aktualne/img/largetile.png"
    );

    const items = itemElements.map((itemEl) => ({
      title: itemEl.querySelector("title")?.textContent ?? "",
      content: itemEl.querySelector("description")?.textContent ?? "",
      author: {
        profileImage,
        title: "",
      },
      published: new Date(itemEl.querySelector("pubDate")?.textContent ?? ""),
    }));

    // sort items from latest to oldest
    items.sort((a, b) => +b.published - +a.published);

    return items;
  }

  async *[Symbol.asyncIterator]() {
    yield* await this.getItems();
  }
}
