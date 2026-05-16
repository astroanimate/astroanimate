import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("AnimatedTabs component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const animatedTabs = read("src/components/AnimatedTabs/AnimatedTabs.astro");

    expect(animatedTabs).toContain("data-astro-tabs");
    expect(animatedTabs).toContain("data-variant={variant}");
    expect(animatedTabs).toContain("data-size={size}");
    expect(animatedTabs).toContain("{...rest}");
    expect(animatedTabs).toContain("<script is:inline>");
    expect(animatedTabs).toContain("prefers-reduced-motion: reduce");
    expect(animatedTabs).toContain("document.querySelectorAll('[data-astro-tabs]').forEach(enhanceTabs)");
    expect(animatedTabs).toContain("new MutationObserver(function()");
    expect(animatedTabs).not.toContain("../../enhancers/");
    expect(animatedTabs).not.toContain("client:");
    expect(animatedTabs).not.toContain("astro:page-load");
  });
});
