import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("GridDotsBackground component contract", () => {
  it("keeps the component package-safe and CSS-only", () => {
    const component = read("src/components/GridDotsBackground/GridDotsBackground.astro");

    expect(component).toContain("prefers-reduced-motion: reduce");
    expect(component).not.toContain("../../enhancers/");
    expect(component).not.toContain("client:");
    expect(component).not.toContain("astro:page-load");
    expect(component).not.toContain("<script");
  });

  it("exports GridDotsBackground from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./GridDotsBackground"]).toEqual({
      types: "./dist/components/GridDotsBackground/GridDotsBackground.astro",
      import: "./dist/components/GridDotsBackground/GridDotsBackground.astro",
      default: "./dist/components/GridDotsBackground/GridDotsBackground.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as GridDotsBackground } from "./GridDotsBackground/GridDotsBackground.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as GridDotsBackground } from "./components/GridDotsBackground/GridDotsBackground.astro";',
    );
  });
});
