import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("ScaleIn component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const scaleIn = read("src/components/ScaleIn/ScaleIn.astro");

    expect(scaleIn).toContain("data-astro-scale-in");
    expect(scaleIn).toContain('data-enhance={enhance ? "true" : "false"}');
    expect(scaleIn).toContain('data-once={once ? "true" : "false"}');
    expect(scaleIn).toContain("data-margin={margin}");
    expect(scaleIn).toContain("style={mergedStyles}");
    expect(scaleIn).toContain("--duration: ${duration}ms");
    expect(scaleIn).toContain("--delay: ${delay}ms");
    expect(scaleIn).toContain("--easing: ${easing}");
    expect(scaleIn).toContain("--initial-scale: ${initialScale}");
    expect(scaleIn).toContain("<script is:inline>");
    expect(scaleIn).toContain("prefers-reduced-motion: reduce");
    expect(scaleIn).toContain(
      "querySelectorAll('[data-astro-scale-in][data-enhance=\"true\"]:not([data-ready])')",
    );
    expect(scaleIn).toContain("new MutationObserver(function ()");
    expect(scaleIn).not.toContain("../../enhancers/");
    expect(scaleIn).not.toContain("client:");
    expect(scaleIn).not.toContain("astro:page-load");
  });
});
