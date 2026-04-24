import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("Alert component contract", () => {
  it("keeps the component package-safe and inline-enhanced", () => {
    const alert = read("src/components/Alert/Alert.astro");

    expect(alert).toContain("<script is:inline>");
    expect(alert).toContain("data-astro-alert");
    expect(alert).toContain("prefers-reduced-motion: reduce");
    expect(alert).not.toContain("../../enhancers/alert");
    expect(alert).not.toContain("client:");
    expect(alert).not.toContain("astro:page-load");
  });

  it("exports Alert from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./Alert"]).toEqual({
      types: "./dist/components/Alert/Alert.astro",
      import: "./dist/components/Alert/Alert.astro",
      default: "./dist/components/Alert/Alert.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as Alert } from "./Alert/Alert.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as Alert } from "./components/Alert/Alert.astro";',
    );
  });
});
