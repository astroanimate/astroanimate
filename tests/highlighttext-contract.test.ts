import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("HighlightText component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const highlightText = read("src/components/HighlightText/HighlightText.astro");

    expect(highlightText).toContain("data-highlight-text");
    expect(highlightText).toContain("prefers-reduced-motion: reduce");
    expect(highlightText).toContain("transition: background-size");
    expect(highlightText).not.toContain("../../enhancers/");
    expect(highlightText).not.toContain("client:");
    expect(highlightText).not.toContain("astro:page-load");
  });
});
