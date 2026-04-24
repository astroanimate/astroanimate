import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("Loader component contract", () => {
  it("keeps the component package-safe and CSS-only", () => {
    const loader = read("src/components/Loader/Loader.astro");

    expect(loader).toContain("prefers-reduced-motion: reduce");
    expect(loader).not.toContain("../../enhancers/");
    expect(loader).not.toContain("client:");
    expect(loader).not.toContain("astro:page-load");
    expect(loader).not.toContain("<script");
  });

  it("exports Loader from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./Loader"]).toEqual({
      types: "./dist/components/Loader/Loader.astro",
      import: "./dist/components/Loader/Loader.astro",
      default: "./dist/components/Loader/Loader.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as Loader } from "./Loader/Loader.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as Loader } from "./components/Loader/Loader.astro";',
    );
  });
});
