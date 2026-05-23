import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("ArticleCard component contract", () => {
  it("stays CSS-first and package-safe", () => {
    const articleCard = read(
      "src/components/ArticleCard/ArticleCard.astro",
    );

    expect(articleCard).toContain("data-ac");
    expect(articleCard).toContain("prefers-reduced-motion: reduce");
    expect(articleCard).not.toContain("<script");
    expect(articleCard).not.toContain("client:");
    expect(articleCard).not.toContain("astro:page-load");
  });

  it("exports ArticleCard from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./ArticleCard"]).toEqual({
      types: "./dist/components/ArticleCard/ArticleCard.astro",
      import: "./dist/components/ArticleCard/ArticleCard.astro",
      default: "./dist/components/ArticleCard/ArticleCard.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as ArticleCard } from "./ArticleCard/ArticleCard.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as ArticleCard } from "./components/ArticleCard/ArticleCard.astro";',
    );
  });
});
