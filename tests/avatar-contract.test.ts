import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("Avatar component contract", () => {
  it("stays CSS-first and package-safe", () => {
    const avatar = read("src/components/Avatar/Avatar.astro");

    expect(avatar).toContain("data-astro-avatar");
    expect(avatar).toContain("data-astro-avatar-group");
    expect(avatar).toContain("prefers-reduced-motion: reduce");
    expect(avatar).not.toContain("<script");
    expect(avatar).not.toContain("client:");
    expect(avatar).not.toContain("astro:page-load");
    expect(avatar).not.toContain("../../enhancers/");
  });

  it("exports Avatar from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<string, { import: string; types: string; default: string }>;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./Avatar"]).toEqual({
      types: "./dist/components/Avatar/index.d.ts",
      import: "./dist/components/Avatar/index.js",
      default: "./dist/components/Avatar/index.js",
    });
    expect(componentsIndex).toContain(
      'export { default as Avatar } from "./Avatar/Avatar.astro";'
    );
    expect(rootIndex).toContain(
      'export { default as Avatar } from "./components/Avatar/Avatar.astro";'
    );
  });
});
