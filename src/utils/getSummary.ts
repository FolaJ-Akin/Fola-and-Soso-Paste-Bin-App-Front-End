export function getSummary(text: string): string {
  return text.split(" ").slice(0, 5).join(" ") + "...";
}
