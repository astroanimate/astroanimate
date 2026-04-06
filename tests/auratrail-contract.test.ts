import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("AuraTrail contract", () => {
  it("stays CSS-first with no inline enhancement script", () => {
    const source = read("src/components/AuraTrail/AuraTrail.astro");

    expect(source).not.toContain("<script");
    expect(source).not.toContain("client:");
  });

  it("keeps decorative trail layers hidden from assistive tech", () => {
    const source = read("src/components/AuraTrail/AuraTrail.astro");

    expect(source).toContain('aria-hidden="true"');
    expect(source).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
