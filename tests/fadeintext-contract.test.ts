import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("FadeInText component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const fadeInText = read("src/components/FadeInText/FadeInText.astro");

    expect(fadeInText).toContain("data-astro-fade-in-text");
    expect(fadeInText).toContain("data-enhance={enhance ? \"true\" : \"false\"}");
    expect(fadeInText).toContain("data-once={once ? \"true\" : \"false\"}");
    expect(fadeInText).toContain("data-margin={inViewMargin}");
    expect(fadeInText).toContain("style={`--fit-duration:${duration}s;--fit-delay:${delay}s;--fit-easing:${easing};--fit-blur:${blur};--fit-y-offset:${yOffset}px`}");
    expect(fadeInText).toContain("{...rest}");
    expect(fadeInText).toContain("<script is:inline>");
    expect(fadeInText).toContain("prefers-reduced-motion: reduce");
    expect(fadeInText).toContain("querySelectorAll('[data-astro-fade-in-text][data-enhance=\"true\"]')");
    expect(fadeInText).toContain("new MutationObserver(function ()");
    expect(fadeInText).not.toContain("../../enhancers/");
    expect(fadeInText).not.toContain("client:");
    expect(fadeInText).not.toContain("astro:page-load");
  });
});
