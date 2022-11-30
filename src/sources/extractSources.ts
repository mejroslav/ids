import type { Item } from "./types";

function mimeType(r: Response): string {
  return r.headers.get("Content-Type");
}

function toArray<T>(iter: Iterable<T>): T[] {
  return [...iter];
}

const LINK_SELECTORS = [`link[rel="alternate"][type="application/rss+xml"]`];

async function flatFetch(url: string): Promise<Response[]> {
  const res = await fetch(url);

  switch (mimeType(res)) {
    case "text/html":
      {
        const doc = new DOMParser().parseFromString(
          await res.text(),
          "text/html"
        );

        const results = LINK_SELECTORS.flatMap((s) =>
          toArray(doc.querySelectorAll<HTMLLinkElement>(s))
        )
          .map((linkEl) => linkEl.href)
          .map(flatFetch);

        return Promise.all(results).then((r) => r.flat());
      }
      break;
      
    case "application/rss+xml":
      throw new Error("not implemented yet");
  }
}

// TODO: vymyslet
async function rssToItems(url: string): Promise<Item[]> {
  const res = await fetch(url);
  return [];
}
