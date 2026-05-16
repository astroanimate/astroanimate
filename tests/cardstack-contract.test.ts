import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("CardStack component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const cardStack = read("src/components/CardStack/CardStack.astro");

    expect(cardStack).toContain("data-astro-card-stack");
    expect(cardStack).toContain('data-enhance={enhance ? "true" : "false"}');
    expect(cardStack).toContain("data-stack-size={stackSize}");
    expect(cardStack).toContain("data-threshold={swipeThreshold}");
    expect(cardStack).toContain("data-rotation={rotationSensitivity}");
    expect(cardStack).toContain("data-duration={animationDuration}");
    expect(cardStack).toContain("<script is:inline>");
    expect(cardStack).toContain("prefers-reduced-motion: reduce");
    expect(cardStack).toContain(
      "querySelectorAll(\"[data-astro-card-stack][data-enhance='true']\")",
    );
    expect(cardStack).toContain("new MutationObserver(function ()");
    expect(cardStack).not.toContain("../../enhancers/");
    expect(cardStack).not.toContain("client:");
    expect(cardStack).not.toContain("window.initTactileStack"); // Should be private in IIFE
  });
});
