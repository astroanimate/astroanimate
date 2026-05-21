import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("InfiniteMarquee component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const infiniteMarquee = read("src/components/InfiniteMarquee/InfiniteMarquee.astro");

    expect(infiniteMarquee).toContain("marquee-container");
    expect(infiniteMarquee).toContain("marquee-track");
    expect(infiniteMarquee).toContain("marquee-content");
    expect(infiniteMarquee).toContain("prefers-reduced-motion: reduce");
    expect(infiniteMarquee).not.toContain("../../enhancers/");
    expect(infiniteMarquee).not.toContain("client:");
    expect(infiniteMarquee).not.toContain("astro:page-load");
    
    // Check that JS is NOT used as this is a CSS-first component
    expect(infiniteMarquee).not.toContain("<script>");
    expect(infiniteMarquee).not.toContain("<script is:inline>");
  });

  it("has CSS-first architecture with custom properties", () => {
    const infiniteMarquee = read("src/components/InfiniteMarquee/InfiniteMarquee.astro");

    expect(infiniteMarquee).toContain("--speed");
    expect(infiniteMarquee).toContain("--gap");
    expect(infiniteMarquee).toContain("--card-width");
    expect(infiniteMarquee).toContain("--card-bg");
  });

  it("supports reduced motion properly including track and content", () => {
    const infiniteMarquee = read("src/components/InfiniteMarquee/InfiniteMarquee.astro");

    expect(infiniteMarquee).toContain("@media (prefers-reduced-motion: reduce)");
    expect(infiniteMarquee).toContain(".marquee-track, .marquee-content");
    expect(infiniteMarquee).toContain("animation: none !important");
  });
});
