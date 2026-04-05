export function resolveJsonImageSrc(src: string): string {
  if (!src) return "";
  if (/^https?:\/\//i.test(src) || src.startsWith("//")) return src;

  const normalized = src.replace(/^\/?src\//, "");
  if (!normalized.startsWith("assets/")) return src;

  return new URL(`../${normalized}`, import.meta.url).href;
}
