export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function textToPortableText(text: string | undefined) {
  if (!text?.trim()) return undefined;

  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => ({
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          text: paragraph,
          marks: [],
        },
      ],
    }));
}

export function imageReference(assetId: string, alt?: string) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    ...(alt ? { alt } : {}),
  };
}

export function fileReference(assetId: string, caption?: string) {
  return {
    _type: "file",
    asset: { _type: "reference", _ref: assetId },
    ...(caption ? { caption } : {}),
  };
}
