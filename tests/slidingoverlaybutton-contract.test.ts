import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("SlidingOverlayButton component contract", () => {
  it("stays CSS-first and package-safe", () => {
    const slidingOverlayButton = read(
      "src/components/SlidingOverlayButton/SlidingOverlayButton.astro",
    );

    expect(slidingOverlayButton).toContain("data-sob");
    expect(slidingOverlayButton).toContain("prefers-reduced-motion: reduce");
    expect(slidingOverlayButton).not.toContain("<script");
    expect(slidingOverlayButton).not.toContain("client:");
    expect(slidingOverlayButton).not.toContain("astro:page-load");
  });

  it("exports SlidingOverlayButton from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./SlidingOverlayButton"]).toEqual({
      types: "./dist/components/SlidingOverlayButton/SlidingOverlayButton.astro",
      import: "./dist/components/SlidingOverlayButton/SlidingOverlayButton.astro",
      default: "./dist/components/SlidingOverlayButton/SlidingOverlayButton.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as SlidingOverlayButton } from "./SlidingOverlayButton/SlidingOverlayButton.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as SlidingOverlayButton } from "./components/SlidingOverlayButton/SlidingOverlayButton.astro";',
    );
  });
});
