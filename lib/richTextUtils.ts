import { Document, Block, Inline, Text } from "@contentful/rich-text-types";

export const extractCardUrls = (document: Document): string[] => {
  const urls: string[] = [];

  const traverse = (node: Document | Block | Inline | Text) => {
    if ("nodeType" in node && node.nodeType === "hyperlink") {
      const inline = node as Inline;
      const uri = inline.data.uri as string;
      const textContent = inline.content[0] as Text;

      if (textContent && textContent.value === uri) {
        if (!uri.includes("twitter.com") && !uri.includes("x.com")) {
          urls.push(uri);
        }
      }
    }

    if ("content" in node && Array.isArray(node.content)) {
      node.content.forEach(traverse);
    }
  };

  traverse(document);
  return Array.from(new Set(urls));
};

export const extractPlainText = (document: Document, maxLength: number = 160): string => {
  const textParts: string[] = [];

  const traverse = (node: Document | Block | Inline | Text) => {
    if ("value" in node && typeof node.value === "string") {
      textParts.push(node.value);
    }

    if ("content" in node && Array.isArray(node.content)) {
      node.content.forEach(traverse);
    }
  };

  traverse(document);

  const fullText = textParts.join(" ").replace(/\s+/g, " ").trim();
  if (fullText.length <= maxLength) {
    return fullText;
  }
  return fullText.substring(0, maxLength - 1) + "…";
};
