import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("AnimatedCard component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const animatedCard = read("src/components/AnimatedCard/AnimatedCard.astro");

    expect(animatedCard).toContain("data-animated-card");
    expect(animatedCard).toContain("data-variant");
    expect(animatedCard).toContain("data-color");
    expect(animatedCard).toContain("style={mergedStyle}");
    expect(animatedCard).toContain("aria-label");
    expect(animatedCard).toContain("<script>");
    expect(animatedCard).toContain("prefers-reduced-motion: reduce");
    expect(animatedCard).toContain("querySelectorAll");
    expect(animatedCard).toContain("addEventListener");
    expect(animatedCard).not.toContain("../../enhancers/");
    expect(animatedCard).not.toContain("client:");
    expect(animatedCard).not.toContain("astro:page-load");
  });

  it("has CSS-first architecture with themeable custom properties", () => {
    const animatedCard = read("src/components/AnimatedCard/AnimatedCard.astro");

    expect(animatedCard).toContain("--animated-card-accent");
    expect(animatedCard).toContain("--animated-card-border");
    expect(animatedCard).toContain("--animated-card-surface");
    expect(animatedCard).toContain("var(--animated-card-");
  });

  it("supports multiple variants", () => {
    const animatedCard = read("src/components/AnimatedCard/AnimatedCard.astro");

    expect(animatedCard).toContain("lift");
    expect(animatedCard).toContain("scale");
    expect(animatedCard).toContain("flip");
    expect(animatedCard).toContain("shine");
  });

  it("supports multiple color themes", () => {
    const animatedCard = read("src/components/AnimatedCard/AnimatedCard.astro");

    expect(animatedCard).toContain("rose");
    expect(animatedCard).toContain("emerald");
    expect(animatedCard).toContain("violet");
    expect(animatedCard).toContain("amber");
  });

  it("has unique ID generation for multiple instances", () => {
    const animatedCard = read("src/components/AnimatedCard/AnimatedCard.astro");

    expect(animatedCard).toContain("Math.random()");
    expect(animatedCard).toContain("flipId");
  });

  it("has reduced motion support", () => {
    const animatedCard = read("src/components/AnimatedCard/AnimatedCard.astro");

    expect(animatedCard).toContain("@media (prefers-reduced-motion: reduce)");
    expect(animatedCard).toContain("animation: none !important");
    expect(animatedCard).toContain("transition: none !important");
  });
});
