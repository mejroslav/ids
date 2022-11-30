function mimeType(r: Response): string {
  return r.headers.get("Content-Type");
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
        return Promise.all(
          LINK_SELECTORS.map((s) => [
            ...doc.querySelectorAll<HTMLLinkElement>(s),
          ])
            .flat()
            .map((l) => l?.href)
            .filter((l) => l)
            .map(flatFetch)
        ).then((r) => r.flat());
      }
      break;

    case "application/rss+xml":
      throw new Error("not implemented yet");
  }
}
