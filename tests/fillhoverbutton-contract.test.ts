import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("FillHoverButton component contract", () => {
  it("stays CSS-first and package-safe", () => {
    const button = read("src/components/FillHoverButton/FillHoverButton.astro");

    expect(button).toContain("data-fhb");
    expect(button).toContain("prefers-reduced-motion: reduce");
    expect(button).not.toContain("<script");
    expect(button).not.toContain("client:");
    expect(button).not.toContain("astro:page-load");
  });

  it("exports FillHoverButton from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./FillHoverButton"]).toEqual({
      types: "./dist/components/FillHoverButton/FillHoverButton.astro",
      import: "./dist/components/FillHoverButton/FillHoverButton.astro",
      default: "./dist/components/FillHoverButton/FillHoverButton.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as FillHoverButton } from "./FillHoverButton/FillHoverButton.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as FillHoverButton } from "./components/FillHoverButton/FillHoverButton.astro";',
    );
  });
});
