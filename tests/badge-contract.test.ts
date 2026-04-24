import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("Badge component contract", () => {
  it("stays CSS-first and package-safe", () => {
    const badge = read("src/components/Badge/Badge.astro");

    expect(badge).toContain("data-astro-badge");
    expect(badge).toContain("prefers-reduced-motion: reduce");
    expect(badge).not.toContain("<script");
    expect(badge).not.toContain("client:");
    expect(badge).not.toContain("astro:page-load");
    expect(badge).not.toContain("../../enhancers/");
  });

  it("exports Badge from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./Badge"]).toEqual({
      types: "./dist/components/Badge/Badge.astro",
      import: "./dist/components/Badge/Badge.astro",
      default: "./dist/components/Badge/Badge.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as Badge } from "./Badge/Badge.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as Badge } from "./components/Badge/Badge.astro";',
    );
  });
});
