import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("SlideIn component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const slideIn = read("src/components/SlideIn/SlideIn.astro");

    expect(slideIn).toContain("data-astro-slide-in");
    expect(slideIn).toContain("data-threshold={String(safeThreshold)}");
    expect(slideIn).toContain("data-root-margin={safeRootMargin}");
    expect(slideIn).toContain("style={mergedStyles}");
    expect(slideIn).toContain("{...rest}");
    expect(slideIn).toContain("<script is:inline>");
    expect(slideIn).toContain("prefers-reduced-motion: reduce");
    expect(slideIn).toContain("querySelectorAll(selector).forEach(initElement)");
    expect(slideIn).toContain("new MutationObserver(function (mutations)");
    expect(slideIn).toContain('new CustomEvent("astro:slidein:" + state');
    expect(slideIn).not.toContain("../../enhancers/");
    expect(slideIn).not.toContain("client:");
    expect(slideIn).not.toContain("astro:page-load");
  });
});
