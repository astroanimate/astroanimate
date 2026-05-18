import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("CountUp component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const countUp = read("src/components/CountUp/CountUp.astro");

    expect(countUp).toContain("data-countup");
    expect(countUp).toContain("data-enhance={enhance ? \"true\" : \"false\"}");
    expect(countUp).toContain("prefers-reduced-motion: reduce");
    expect(countUp).not.toContain("client:");
    expect(countUp).not.toContain("astro:page-load");
  });

  it("exports CountUp from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./CountUp"]).toEqual({
      types: "./dist/components/CountUp/CountUp.astro",
      import: "./dist/components/CountUp/CountUp.astro",
      default: "./dist/components/CountUp/CountUp.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as CountUp } from "./CountUp/CountUp.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as CountUp } from "./components/CountUp/CountUp.astro";',
    );
  });
});
