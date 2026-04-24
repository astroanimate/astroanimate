import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("BlurFadeIn component contract", () => {
  it("stays CSS-first, visible by default, and package-safe", () => {
    const blurFadeIn = read("src/components/BlurFadeIn/BlurFadeIn.astro");

    expect(blurFadeIn).toContain("data-astro-blur-fade-in");
    expect(blurFadeIn).toContain("prefers-reduced-motion: reduce");
    expect(blurFadeIn).toContain("prefers-reduced-motion: no-preference");
    expect(blurFadeIn).toContain("opacity: 1");
    expect(blurFadeIn).toContain("@keyframes astro-blur-fade-in");
    expect(blurFadeIn).not.toContain("<script");
    expect(blurFadeIn).not.toContain("client:");
    expect(blurFadeIn).not.toContain("astro:page-load");
    expect(blurFadeIn).not.toContain("../../enhancers/");
  });

  it("exports BlurFadeIn from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./BlurFadeIn"]).toEqual({
      types: "./dist/components/BlurFadeIn/BlurFadeIn.astro",
      import: "./dist/components/BlurFadeIn/BlurFadeIn.astro",
      default: "./dist/components/BlurFadeIn/BlurFadeIn.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as BlurFadeIn } from "./BlurFadeIn/BlurFadeIn.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as BlurFadeIn } from "./components/BlurFadeIn/BlurFadeIn.astro";',
    );
  });
});
