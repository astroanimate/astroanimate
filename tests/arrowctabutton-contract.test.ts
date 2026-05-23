import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("ArrowCTAButton component contract", () => {
  it("stays CSS-first and package-safe", () => {
    const arrowCtaButton = read(
      "src/components/ArrowCTAButton/ArrowCTAButton.astro",
    );

    expect(arrowCtaButton).toContain("data-acta");
    expect(arrowCtaButton).toContain("prefers-reduced-motion: reduce");
    expect(arrowCtaButton).not.toContain("<script");
    expect(arrowCtaButton).not.toContain("client:");
    expect(arrowCtaButton).not.toContain("astro:page-load");
  });

  it("exports ArrowCTAButton from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./ArrowCTAButton"]).toEqual({
      types: "./dist/components/ArrowCTAButton/ArrowCTAButton.astro",
      import: "./dist/components/ArrowCTAButton/ArrowCTAButton.astro",
      default: "./dist/components/ArrowCTAButton/ArrowCTAButton.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as ArrowCTAButton } from "./ArrowCTAButton/ArrowCTAButton.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as ArrowCTAButton } from "./components/ArrowCTAButton/ArrowCTAButton.astro";',
    );
  });
});
