import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("TextReveal component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const textReveal = read("src/components/TextReveal/TextReveal.astro");

    expect(textReveal).toContain("data-astro-text-reveal");
    expect(textReveal).toContain('data-enhance={enhance ? "true" : "false"}');
    expect(textReveal).toContain('data-once={once ? "true" : "false"}');
    expect(textReveal).toContain("data-margin={inViewMargin}");
    expect(textReveal).toContain("style={`--tr-duration:${duration}s;--tr-delay:${delay}s;--tr-easing:${easing};--tr-translate-start:${translateStart}`}");
    expect(textReveal).toContain("{...rest}");
    expect(textReveal).toContain("<script is:inline>");
    expect(textReveal).toContain("prefers-reduced-motion: reduce");
    expect(textReveal).toContain('querySelectorAll(\'[data-astro-text-reveal][data-enhance="true"]\')');
    expect(textReveal).toContain("new MutationObserver(function ()");
    expect(textReveal).not.toContain("../../enhancers/");
    expect(textReveal).not.toContain("client:");
    expect(textReveal).not.toContain("astro:page-load");
  });
});
