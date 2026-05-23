import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("StaggerTextButton component contract", () => {
  it("stays CSS-first and package-safe", () => {
    const staggerTextButton = read(
      "src/components/StaggerTextButton/StaggerTextButton.astro",
    );

    expect(staggerTextButton).toContain("data-stb");
    expect(staggerTextButton).toContain("prefers-reduced-motion: reduce");
    expect(staggerTextButton).not.toContain("<script");
    expect(staggerTextButton).not.toContain("client:");
    expect(staggerTextButton).not.toContain("astro:page-load");
  });

  it("exports StaggerTextButton from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./StaggerTextButton"]).toEqual({
      types: "./dist/components/StaggerTextButton/StaggerTextButton.astro",
      import: "./dist/components/StaggerTextButton/StaggerTextButton.astro",
      default: "./dist/components/StaggerTextButton/StaggerTextButton.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as StaggerTextButton } from "./StaggerTextButton/StaggerTextButton.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as StaggerTextButton } from "./components/StaggerTextButton/StaggerTextButton.astro";',
    );
  });
});
