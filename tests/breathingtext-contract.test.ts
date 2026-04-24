import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("BreathingText component contract", () => {
  it("stays CSS-first, visible by default, and package-safe", () => {
    const breathingText = read(
      "src/components/BreathingText/BreathingText.astro",
    );

    expect(breathingText).toContain("data-astro-breathing-text");
    expect(breathingText).toContain("prefers-reduced-motion: reduce");
    expect(breathingText).toContain("prefers-reduced-motion: no-preference");
    expect(breathingText).toContain("opacity: 1");
    expect(breathingText).toContain("@keyframes astro-breathing-text");
    expect(breathingText).not.toContain("<script");
    expect(breathingText).not.toContain("client:");
    expect(breathingText).not.toContain("astro:page-load");
    expect(breathingText).not.toContain("../../enhancers/");
  });

  it("exports BreathingText from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./BreathingText"]).toEqual({
      types: "./dist/components/BreathingText/BreathingText.astro",
      import: "./dist/components/BreathingText/BreathingText.astro",
      default: "./dist/components/BreathingText/BreathingText.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as BreathingText } from "./BreathingText/BreathingText.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as BreathingText } from "./components/BreathingText/BreathingText.astro";',
    );
  });
});
