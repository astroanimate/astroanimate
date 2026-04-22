import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("AnimatedButton component contract", () => {
  it("stays CSS-first and package-safe", () => {
    const animatedButton = read(
      "src/components/AnimatedButton/AnimatedButton.astro",
    );

    expect(animatedButton).toContain("data-astro-animated-button");
    expect(animatedButton).toContain("prefers-reduced-motion: reduce");
    expect(animatedButton).not.toContain("<script");
    expect(animatedButton).not.toContain("../../enhancers/button");
    expect(animatedButton).not.toContain("client:");
    expect(animatedButton).not.toContain("astro:page-load");
  });

  it("includes disabled prop and validation", () => {
    const animatedButton = read(
      "src/components/AnimatedButton/AnimatedButton.astro",
    );

    expect(animatedButton).toContain("disabled?: boolean");
    expect(animatedButton).toContain('disabled && "disabled"');
    expect(animatedButton).toContain(".animated-button.disabled");
    expect(animatedButton).toContain("isValidColor");
    expect(animatedButton).toContain("validatedVariant");
  });

  it("exports AnimatedButton from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./AnimatedButton"]).toEqual({
      types: "./dist/components/AnimatedButton/index.d.ts",
      import: "./dist/components/AnimatedButton/index.js",
      default: "./dist/components/AnimatedButton/index.js",
    });
    expect(componentsIndex).toContain(
      'export { default as AnimatedButton } from "./AnimatedButton/AnimatedButton.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as AnimatedButton } from "./components/AnimatedButton/AnimatedButton.astro";',
    );
  });
});
