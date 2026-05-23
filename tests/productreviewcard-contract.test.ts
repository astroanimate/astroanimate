import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("ProductReviewCard component contract", () => {
  it("stays CSS-first and package-safe", () => {
    const productReviewCard = read(
      "src/components/ProductReviewCard/ProductReviewCard.astro",
    );

    expect(productReviewCard).toContain("data-pgc");
    expect(productReviewCard).toContain("prefers-reduced-motion: reduce");
    expect(productReviewCard).not.toContain("<script");
    expect(productReviewCard).not.toContain("client:");
    expect(productReviewCard).not.toContain("astro:page-load");
  });

  it("exports ProductReviewCard from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./ProductReviewCard"]).toEqual({
      types: "./dist/components/ProductReviewCard/ProductReviewCard.astro",
      import: "./dist/components/ProductReviewCard/ProductReviewCard.astro",
      default: "./dist/components/ProductReviewCard/ProductReviewCard.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as ProductReviewCard } from "./ProductReviewCard/ProductReviewCard.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as ProductReviewCard } from "./components/ProductReviewCard/ProductReviewCard.astro";',
    );
  });
});
