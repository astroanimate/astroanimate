import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("ProgressBar component contract", () => {
  it("keeps the component package-safe and CSS-only", () => {
    const progressBar = read("src/components/ProgressBar/ProgressBar.astro");

    expect(progressBar).toContain("prefers-reduced-motion: reduce");
    expect(progressBar).not.toContain("../../enhancers/");
    expect(progressBar).not.toContain("client:");
    expect(progressBar).not.toContain("astro:page-load");
    expect(progressBar).not.toContain("<script");
  });

  it("exports ProgressBar from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./ProgressBar"]).toEqual({
      types: "./dist/components/ProgressBar/ProgressBar.astro",
      import: "./dist/components/ProgressBar/ProgressBar.astro",
      default: "./dist/components/ProgressBar/ProgressBar.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as ProgressBar } from "./ProgressBar/ProgressBar.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as ProgressBar } from "./components/ProgressBar/ProgressBar.astro";',
    );
  });
});
