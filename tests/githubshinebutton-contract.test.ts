import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("GitHubShineButton component contract", () => {
  it("stays CSS-first and package-safe", () => {
    const component = read(
      "src/components/GitHubShineButton/GitHubShineButton.astro",
    );

    expect(component).toContain("data-ghsb");
    expect(component).toContain("prefers-reduced-motion: reduce");
    expect(component).not.toContain("<script");
    expect(component).not.toContain("client:");
    expect(component).not.toContain("astro:page-load");
  });

  it("exports GitHubShineButton from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./GitHubShineButton"]).toEqual({
      types: "./dist/components/GitHubShineButton/GitHubShineButton.astro",
      import: "./dist/components/GitHubShineButton/GitHubShineButton.astro",
      default: "./dist/components/GitHubShineButton/GitHubShineButton.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as GitHubShineButton } from "./GitHubShineButton/GitHubShineButton.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as GitHubShineButton } from "./components/GitHubShineButton/GitHubShineButton.astro";',
    );
  });
});
