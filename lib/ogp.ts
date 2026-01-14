export type OgpData = {
  url: string;
  title: string;
  description: string;
  image: string;
  siteName: string;
};

export const fetchOgp = async (url: string): Promise<OgpData | null> => {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "bot",
      },
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();
    const ogp: OgpData = {
      url,
      title: extractMetaContent(html, "og:title") || extractTitle(html) || url,
      description: extractMetaContent(html, "og:description") || extractMetaContent(html, "description") || "",
      image: extractMetaContent(html, "og:image") || "",
      siteName: extractMetaContent(html, "og:site_name") || new URL(url).hostname,
    };

    return ogp;
  } catch {
    return null;
  }
};

const extractMetaContent = (html: string, property: string): string => {
  const ogRegex = new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']`, "i");
  const nameRegex = new RegExp(`<meta[^>]*name=["']${property}["'][^>]*content=["']([^"']*)["']`, "i");
  const reverseOgRegex = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${property}["']`, "i");
  const reverseNameRegex = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${property}["']`, "i");

  const match =
    html.match(ogRegex) || html.match(nameRegex) || html.match(reverseOgRegex) || html.match(reverseNameRegex);
  return match ? match[1] : "";
};

const extractTitle = (html: string): string => {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? match[1] : "";
};

export const fetchOgpBatch = async (urls: string[]): Promise<Map<string, OgpData>> => {
  const results = await Promise.all(urls.map((url) => fetchOgp(url)));
  const ogpMap = new Map<string, OgpData>();

  urls.forEach((url, index) => {
    const ogp = results[index];
    if (ogp) {
      ogpMap.set(url, ogp);
    }
  });

  return ogpMap;
};
