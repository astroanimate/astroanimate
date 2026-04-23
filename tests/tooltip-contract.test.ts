import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("Tooltip component contract", () => {
  it("keeps the component package-safe and inline-enhanced", () => {
    const tooltip = read("src/components/Tooltip/Tooltip.astro");

    expect(tooltip).toContain("<script is:inline>");
    expect(tooltip).toContain("data-astro-tooltip");
    expect(tooltip).toContain("data-astro-tooltip-wrapper");
    expect(tooltip).toContain("prefers-reduced-motion: reduce");
    expect(tooltip).not.toContain("../../enhancers/tooltip");
    expect(tooltip).not.toContain("client:");
    expect(tooltip).not.toContain("astro:page-load");
  });

  it("exports Tooltip from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<string, { import: string; types: string; default: string }>;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./Tooltip"]).toEqual({
      types: "./dist/components/Tooltip/index.d.ts",
      import: "./dist/components/Tooltip/index.js",
      default: "./dist/components/Tooltip/index.js",
    });
    expect(componentsIndex).toContain('export { default as Tooltip } from "./Tooltip/Tooltip.astro";');
    expect(rootIndex).toContain('export { default as Tooltip } from "./components/Tooltip/Tooltip.astro";');
  });
});
