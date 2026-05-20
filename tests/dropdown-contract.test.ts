import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("Dropdown component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const dropdown = read("src/components/Dropdown/Dropdown.astro");

    expect(dropdown).toContain("data-dropdown");
    expect(dropdown).toContain("data-enhance={enhance ? \"true\" : \"false\"}");
    expect(dropdown).toContain("prefers-reduced-motion: reduce");
    expect(dropdown).not.toContain("client:");
    expect(dropdown).not.toContain("astro:page-load");
  });

  it("exports Dropdown from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./Dropdown"]).toEqual({
      types: "./dist/components/Dropdown/Dropdown.astro",
      import: "./dist/components/Dropdown/Dropdown.astro",
      default: "./dist/components/Dropdown/Dropdown.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as Dropdown } from "./Dropdown/Dropdown.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as Dropdown } from "./components/Dropdown/Dropdown.astro";',
    );
  });
});
