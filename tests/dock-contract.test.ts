import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("Dock component contract", () => {
  it("keeps the component package-safe and inline-enhanced", () => {
    const dock = read("src/components/Dock/Dock.astro");

    expect(dock).toContain("<script is:inline>");
    expect(dock).toContain("data-astro-dock");
    expect(dock).toContain("prefers-reduced-motion: reduce");
    expect(dock).not.toContain("../../enhancers/dock");
    expect(dock).not.toContain("client:");
    expect(dock).not.toContain("astro:page-load");
  });

  it("exports Dock and DockItem from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./Dock"]).toEqual({
      types: "./dist/components/Dock/Dock.astro",
      import: "./dist/components/Dock/Dock.astro",
      default: "./dist/components/Dock/Dock.astro",
    });
    expect(packageJson.exports["./DockItem"]).toEqual({
      types: "./dist/components/Dock/DockItem.astro",
      import: "./dist/components/Dock/DockItem.astro",
      default: "./dist/components/Dock/DockItem.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as Dock } from "./Dock/Dock.astro";',
    );
    expect(componentsIndex).toContain(
      'export { default as DockItem } from "./Dock/DockItem.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as Dock } from "./components/Dock/Dock.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as DockItem } from "./components/Dock/DockItem.astro";',
    );
  });
});
