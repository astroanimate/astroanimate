import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("FadeIn component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const fadeIn = read("src/components/FadeIn/FadeIn.astro");

    expect(fadeIn).toContain("data-astro-fade-in");
    expect(fadeIn).toContain("data-threshold={String(safeThreshold)}");
    expect(fadeIn).toContain("data-in-view-margin={safeInViewMargin}");
    expect(fadeIn).toContain("style={mergedStyles}");
    expect(fadeIn).toContain("{...rest}");
    expect(fadeIn).toContain("<script is:inline>");
    expect(fadeIn).toContain("prefers-reduced-motion: reduce");
    expect(fadeIn).toContain("querySelectorAll(selector).forEach(initElement)");
    expect(fadeIn).toContain("new MutationObserver(function (mutations)");
    expect(fadeIn).toContain('new CustomEvent("astro:fadein:" + state');
    expect(fadeIn).not.toContain("../../enhancers/");
    expect(fadeIn).not.toContain("client:");
    expect(fadeIn).not.toContain("astro:page-load");
  });
});
