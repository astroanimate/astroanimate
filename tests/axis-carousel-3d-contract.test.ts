import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("AxisCarousel3D component contract", () => {
  it("stays CSS-first and package-safe", () => {
    const source = read("src/components/AxisCarousel3D/AxisCarousel3D.astro");

    expect(source).toContain("data-astro-axis-carousel-3d");
    expect(source).toContain("prefers-reduced-motion: reduce");
    expect(source).toContain("<script is:inline>");
    expect(source).toContain("data-axis-carousel-prev");
    expect(source).toContain("data-axis-carousel-next");
    expect(source).not.toContain("client:");
    expect(source).not.toContain("astro:page-load");
    expect(source).not.toContain("../../enhancers/");
  });

  it("exports AxisCarousel3D from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<string, { import: string; types: string; default: string }>;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./AxisCarousel3D"]).toEqual({
      types: "./dist/components/AxisCarousel3D/index.d.ts",
      import: "./dist/components/AxisCarousel3D/index.js",
      default: "./dist/components/AxisCarousel3D/index.js",
    });
    expect(componentsIndex).toContain(
      'export { default as AxisCarousel3D } from "./AxisCarousel3D/AxisCarousel3D.astro";'
    );
    expect(rootIndex).toContain(
      'export { default as AxisCarousel3D } from "./components/AxisCarousel3D/AxisCarousel3D.astro";'
    );
  });
});
