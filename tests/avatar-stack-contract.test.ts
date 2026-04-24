import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("AvatarStack component contract", () => {
  it("stays CSS-first and package-safe", () => {
    const source = read("src/components/AvatarStack/AvatarStack.astro");

    expect(source).toContain("data-astro-avatar-stack");
    expect(source).toContain("prefers-reduced-motion: reduce");
    expect(source).toContain("<script is:inline>");
    expect(source).toContain("title={avatar.name}");
    expect(source).not.toContain("client:");
    expect(source).not.toContain("astro:page-load");
    expect(source).not.toContain("../../enhancers/");
  });

  it("exports AvatarStack from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./AvatarStack"]).toEqual({
      types: "./dist/components/AvatarStack/AvatarStack.astro",
      import: "./dist/components/AvatarStack/AvatarStack.astro",
      default: "./dist/components/AvatarStack/AvatarStack.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as AvatarStack } from "./AvatarStack/AvatarStack.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as AvatarStack } from "./components/AvatarStack/AvatarStack.astro";',
    );
  });
});
