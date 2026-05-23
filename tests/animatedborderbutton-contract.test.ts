import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("AnimatedBorderButton component contract", () => {
  it("stays CSS-first and package-safe", () => {
    const animatedBorderButton = read(
      "src/components/AnimatedBorderButton/AnimatedBorderButton.astro",
    );

    expect(animatedBorderButton).toContain("data-abb");
    expect(animatedBorderButton).toContain("prefers-reduced-motion: reduce");
    expect(animatedBorderButton).not.toContain("<script");
    expect(animatedBorderButton).not.toContain("client:");
    expect(animatedBorderButton).not.toContain("astro:page-load");
  });

  it("exports AnimatedBorderButton from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./AnimatedBorderButton"]).toEqual({
      types: "./dist/components/AnimatedBorderButton/AnimatedBorderButton.astro",
      import: "./dist/components/AnimatedBorderButton/AnimatedBorderButton.astro",
      default: "./dist/components/AnimatedBorderButton/AnimatedBorderButton.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as AnimatedBorderButton } from "./AnimatedBorderButton/AnimatedBorderButton.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as AnimatedBorderButton } from "./components/AnimatedBorderButton/AnimatedBorderButton.astro";',
    );
  });
});
