import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("package contract", () => {
  it("publishes dist-based entrypoints", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      main: string;
      module: string;
      types: string;
      exports: Record<string, { import: string; types: string }>;
    };
    const fadeInExport = packageJson.exports["./FadeIn"];

    expect(packageJson.main).toBe("./dist/index.js");
    expect(packageJson.module).toBe("./dist/index.js");
    expect(packageJson.types).toBe("./dist/index.d.ts");
    expect(fadeInExport).toBeDefined();
    expect(fadeInExport?.import).toBe("./dist/components/FadeIn/index.js");
  });

  it("uses Astro-aware typechecking", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      scripts: Record<string, string>;
    };

    expect(packageJson.scripts.typecheck).toContain("astro check");
  });

  it("keeps component enhancement rules visible in source", () => {
    const fadeIn = read("src/components/FadeIn/FadeIn.astro");
    const reveal = read("src/components/Reveal/Reveal.astro");
    const textRotate = read("src/components/TextRotate/TextRotate.astro");

    expect(fadeIn).toContain("<script is:inline>");
    expect(reveal).toContain("<script is:inline>");
    expect(textRotate).toContain("<script is:inline>");

    expect(fadeIn).not.toContain("astro:page-load");
    expect(reveal).not.toContain("astro:page-load");
    expect(textRotate).not.toContain("client:");
  });
});
