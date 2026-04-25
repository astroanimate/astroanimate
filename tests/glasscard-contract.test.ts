import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("GlassCard component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const glassCard = read("src/components/GlassCard/GlassCard.astro");

    expect(glassCard).toContain("data-glass-card");
    expect(glassCard).toContain("data-tilt-intensity");
    expect(glassCard).toContain("data-enable-tilt");
    expect(glassCard).toContain("style={mergedStyle}");
    expect(glassCard).toContain("aria-label");
    expect(glassCard).toContain("<script define:vars={{ cardId }}>");
    expect(glassCard).toContain("prefers-reduced-motion: reduce");
    expect(glassCard).toContain("getElementById");
    expect(glassCard).toContain("addEventListener");
    expect(glassCard).not.toContain("../../enhancers/");
    expect(glassCard).not.toContain("client:");
    expect(glassCard).not.toContain("astro:page-load");
  });

  it("has CSS-first architecture with themeable custom properties", () => {
    const glassCard = read("src/components/GlassCard/GlassCard.astro");

    expect(glassCard).toContain("--glass-card-bg");
    expect(glassCard).toContain("--glass-card-border");
    expect(glassCard).toContain("--glass-card-title-color");
    expect(glassCard).toContain("var(--glass-card-");
  });

  it("has unique ID generation for multiple instances", () => {
    const glassCard = read("src/components/GlassCard/GlassCard.astro");

    expect(glassCard).toContain("Math.random()");
    expect(glassCard).toContain("cardId");
  });

  it("has reduced motion support", () => {
    const glassCard = read("src/components/GlassCard/GlassCard.astro");

    expect(glassCard).toContain("@media (prefers-reduced-motion: reduce)");
    expect(glassCard).toContain("transition: none");
  });

  it("supports tilt enable/disable via prop", () => {
    const glassCard = read("src/components/GlassCard/GlassCard.astro");

    expect(glassCard).toContain("enableTilt");
    expect(glassCard).toContain("data-enable-tilt");
  });

  it("supports customizable colors via props", () => {
    const glassCard = read("src/components/GlassCard/GlassCard.astro");

    expect(glassCard).toContain("titleColor");
    expect(glassCard).toContain("subtitleColor");
    expect(glassCard).toContain("descriptionColor");
    expect(glassCard).toContain("iconColor");
    expect(glassCard).toContain("backgroundColor");
    expect(glassCard).toContain("borderColor");
  });
});
