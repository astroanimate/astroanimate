import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("LiquidGlassCard component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const lgc = read("src/components/LiquidGlassCard/LiquidGlassCard.astro");

    expect(lgc).toContain("data-lg-instance");
    expect(lgc).toContain("data-lg-draggable");
    expect(lgc).toContain("data-lg-expandable");
    expect(lgc).toContain("data-lg-expanded");
    expect(lgc).toContain("style={inlineStyle}");
    expect(lgc).toContain("<script is:inline define:vars={{ draggable, expandable, blurPx, instanceId }}>");
    expect(lgc).toContain("prefers-reduced-motion: reduce");
    expect(lgc).toContain("addEventListener");
    expect(lgc).not.toContain("../../enhancers/");
    expect(lgc).not.toContain("client:");
    expect(lgc).not.toContain("astro:page-load");
  });

  it("has CSS-first architecture with themeable custom properties", () => {
    const lgc = read("src/components/LiquidGlassCard/LiquidGlassCard.astro");

    expect(lgc).toContain("--lg-width");
    expect(lgc).toContain("--lg-height");
    expect(lgc).toContain("--lg-blur");
    expect(lgc).toContain("--lg-radius");
    expect(lgc).toContain("--lg-shadow");
    expect(lgc).toContain("--lg-padding-top");
    expect(lgc).toContain("--lg-padding-bottom");
    expect(lgc).toContain("--lg-padding-left");
    expect(lgc).toContain("--lg-padding-right");
    expect(lgc).toContain("var(--lg-");
  });

  it("has unique ID generation for multiple instances", () => {
    const lgc = read("src/components/LiquidGlassCard/LiquidGlassCard.astro");

    expect(lgc).toContain("Math.random()");
    expect(lgc).toContain("instanceId");
  });

  it("has reduced motion support", () => {
    const lgc = read("src/components/LiquidGlassCard/LiquidGlassCard.astro");

    expect(lgc).toContain("@media (prefers-reduced-motion: reduce)");
    expect(lgc).toContain("transition: none");
  });

  it("supports draggable and expandable props", () => {
    const lgc = read("src/components/LiquidGlassCard/LiquidGlassCard.astro");

    expect(lgc).toContain("draggable");
    expect(lgc).toContain("expandable");
    expect(lgc).toContain("data-lg-draggable");
    expect(lgc).toContain("data-lg-expandable");
  });

  it("exposes blur, glow, and shadow intensity props", () => {
    const lgc = read("src/components/LiquidGlassCard/LiquidGlassCard.astro");

    expect(lgc).toContain("blurIntensity");
    expect(lgc).toContain("glowIntensity");
    expect(lgc).toContain("shadowIntensity");
    expect(lgc).toContain("blurMap");
    expect(lgc).toContain("glowMap");
    expect(lgc).toContain("shadowMap");
  });

  it("supports customizable padding per side", () => {
    const lgc = read("src/components/LiquidGlassCard/LiquidGlassCard.astro");

    expect(lgc).toContain("paddingTop");
    expect(lgc).toContain("paddingBottom");
    expect(lgc).toContain("paddingLeft");
    expect(lgc).toContain("paddingRight");
  });

  it("has SVG filter injection for liquid glass effect", () => {
    const lgc = read("src/components/LiquidGlassCard/LiquidGlassCard.astro");

    expect(lgc).toContain("feTurbulence");
    expect(lgc).toContain("feDisplacementMap");
    expect(lgc).toContain("fractalNoise");
  });

  it("has cleanup via MutationObserver", () => {
    const lgc = read("src/components/LiquidGlassCard/LiquidGlassCard.astro");

    expect(lgc).toContain("MutationObserver");
    expect(lgc).toContain("_lgCleanup");
  });
});
