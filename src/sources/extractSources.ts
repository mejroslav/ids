import { fetch, Response, ResponseType } from "@tauri-apps/api/http";
import { toArray } from "src/utils/array";

function mimeType(r: Response<any>): string {
  return r.headers["Content-Type"];
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
    default:
      throw new Error("not implemented yet");
  }
}
