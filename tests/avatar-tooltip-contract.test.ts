import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("AvatarTooltip component contract", () => {
  it("stays CSS-first and package-safe", () => {
    const source = read("src/components/AvatarTooltip/AvatarTooltip.astro");

    expect(source).toContain("data-astro-avatar-tooltip");
    expect(source).toContain("prefers-reduced-motion: reduce");
    expect(source).toContain('role="tooltip"');
    expect(source).toContain("title={`${avatar.name} - ${avatar.role}`}");
    expect(source).not.toContain("<script");
    expect(source).not.toContain("client:");
    expect(source).not.toContain("astro:page-load");
    expect(source).not.toContain("../../enhancers/");
  });

  it("exports AvatarTooltip from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./AvatarTooltip"]).toEqual({
      types: "./dist/components/AvatarTooltip/AvatarTooltip.astro",
      import: "./dist/components/AvatarTooltip/AvatarTooltip.astro",
      default: "./dist/components/AvatarTooltip/AvatarTooltip.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as AvatarTooltip } from "./AvatarTooltip/AvatarTooltip.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as AvatarTooltip } from "./components/AvatarTooltip/AvatarTooltip.astro";',
    );
  });
});
