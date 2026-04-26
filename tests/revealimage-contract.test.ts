import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("RevealImage component contract", () => {
  it("keeps the package-safe contract in source", () => {
    const revealImage = read("src/components/RevealImage/RevealImage.astro");

    expect(revealImage).toContain("reveal-image-item");
    expect(revealImage).toContain("reveal-image-item-text");
    expect(revealImage).toContain("reveal-image-container");
    expect(revealImage).toContain("reveal-image-effect");
    expect(revealImage).toContain("prefers-reduced-motion: reduce");
    expect(revealImage).toContain("loading=\"lazy\"");
    expect(revealImage).not.toContain("../../enhancers/");
    expect(revealImage).not.toContain("client:");
    expect(revealImage).not.toContain("astro:page-load");
    expect(revealImage).not.toContain("<script");
  });
});
