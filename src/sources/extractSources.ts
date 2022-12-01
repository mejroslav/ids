import type { Item } from "./types";
import { fetch, Response, ResponseType } from '@tauri-apps/api/http';

function mimeType(r: Response<any>): string {
  return r.headers["Content-Type"];
}

function toArray<T>(iter: Iterable<T>): T[] {
  return [...iter];
}

const LINK_SELECTORS = [`link[rel="alternate"][type="application/rss+xml"]`];

async function flatFetch(url: string): Promise<Response<any>[]> {
  const res = await fetch<string>(url, {
    method: "GET",
    responseType: ResponseType.Text,
  });

  switch (mimeType(res)) {
    case "text/html":
      {
        const doc = new DOMParser().parseFromString(res.data, "text/html");

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


export async function rssToItems(url: string): Promise<Item[]> {
  const response = await fetch<string>(url, {
    method: "GET",
    responseType: ResponseType.Text,
  });

  // DOM Parser na parsování RSS z XML
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(response.data, "text/xml");

  const itemElements = toArray(xmlDoc.querySelectorAll("item"));


  // NAIVNÍ KÓD, KTEREJ BY MOHL FUNGOVAT
  // const items: Item[] = [];f
  // for (const itemEl of itemElements) {
  //   const title = itemEl.querySelector("title").textContent;
  //   const content = itemEl.querySelector("description").textContent;
  //   const result: Item = { title, content };
  //   items.push(result);
  // }

  // FUNKCIONÁLNÍ ŘEŠENÍ
  return itemElements.map(itemEl => ({
    title: itemEl.querySelector("title").textContent,
    content: itemEl.querySelector("description").textContent,
    author: { profileImage: new URL("https://asset.stdout.cz/fe/aktualne/img/largetile.png"), title: ""},
    published: new Date (itemEl.querySelector("pubDate").textContent),
  }));
}
