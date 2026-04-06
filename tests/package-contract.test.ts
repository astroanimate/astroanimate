import { existsSync, readFileSync } from "node:fs";
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
    const animatedButtonExport = packageJson.exports["./AnimatedButton"];
    const alertExport = packageJson.exports["./Alert"];
    const auraTrailExport = packageJson.exports["./AuraTrail"];
    const fadeInExport = packageJson.exports["./FadeIn"];

    expect(packageJson.main).toBe("./dist/index.js");
    expect(packageJson.module).toBe("./dist/index.js");
    expect(packageJson.types).toBe("./dist/index.d.ts");
    expect(animatedButtonExport).toBeDefined();
    expect(animatedButtonExport?.import).toBe("./dist/components/AnimatedButton/index.js");
    expect(alertExport).toBeDefined();
    expect(alertExport?.import).toBe("./dist/components/Alert/index.js");
    expect(auraTrailExport).toBeDefined();
    expect(auraTrailExport?.import).toBe("./dist/components/AuraTrail/index.js");
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
    const animatedButton = read("src/components/AnimatedButton/AnimatedButton.astro");
    const alert = read("src/components/Alert/Alert.astro");
    const auraTrail = read("src/components/AuraTrail/AuraTrail.astro");
    const fadeIn = read("src/components/FadeIn/FadeIn.astro");
    const reveal = read("src/components/Reveal/Reveal.astro");
    const textRotate = read("src/components/TextRotate/TextRotate.astro");

    expect(animatedButton).not.toContain("<script");
    expect(alert).toContain("<script is:inline>");
    expect(auraTrail).not.toContain("<script");
    expect(fadeIn).toContain("<script is:inline>");
    expect(reveal).toContain("<script is:inline>");
    expect(textRotate).toContain("<script is:inline>");

    expect(animatedButton).not.toContain("astro:page-load");
    expect(animatedButton).not.toContain("client:");
    expect(alert).not.toContain("astro:page-load");
    expect(auraTrail).not.toContain("astro:page-load");
    expect(fadeIn).not.toContain("astro:page-load");
    expect(reveal).not.toContain("astro:page-load");
    expect(alert).not.toContain("client:");
    expect(auraTrail).not.toContain("client:");
    expect(textRotate).not.toContain("client:");
  });

  it("copies published Astro component files into dist", () => {
    expect(existsSync(resolve(process.cwd(), "dist/components/AnimatedButton/AnimatedButton.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/Alert/Alert.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/AuraTrail/AuraTrail.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/FadeIn/FadeIn.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/Reveal/Reveal.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/TextRotate/TextRotate.astro"))).toBe(true);
  });
});
