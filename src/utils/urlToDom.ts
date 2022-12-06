import { fetch, ResponseType } from "@tauri-apps/api/http";

export async function urlToDom(
  url: URL,
  mime: DOMParserSupportedType
): Promise<Document> {
  // the weird Tauri-specific fetch
  // hopefully replaced by the universal fetch one day
  const response = await fetch<string>(url.href, {
    method: "GET",
    responseType: ResponseType.Text,
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(response.data, mime);

  return doc;
}
