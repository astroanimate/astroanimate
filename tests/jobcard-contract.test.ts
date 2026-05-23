import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("JobCard component contract", () => {
  it("stays CSS-first and package-safe", () => {
    const jobCard = read(
      "src/components/JobCard/JobCard.astro",
    );

    expect(jobCard).toContain("data-job-card");
    expect(jobCard).toContain("prefers-reduced-motion: reduce");
    expect(jobCard).not.toContain("<script");
    expect(jobCard).not.toContain("client:");
    expect(jobCard).not.toContain("astro:page-load");
  });

  it("exports JobCard from the public package surface", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      exports: Record<
        string,
        { import: string; types: string; default: string }
      >;
    };
    const componentsIndex = read("src/components/index.ts");
    const rootIndex = read("src/index.ts");

    expect(packageJson.exports["./JobCard"]).toEqual({
      types: "./dist/components/JobCard/JobCard.astro",
      import: "./dist/components/JobCard/JobCard.astro",
      default: "./dist/components/JobCard/JobCard.astro",
    });
    expect(componentsIndex).toContain(
      'export { default as JobCard } from "./JobCard/JobCard.astro";',
    );
    expect(rootIndex).toContain(
      'export { default as JobCard } from "./components/JobCard/JobCard.astro";',
    );
  });
});
