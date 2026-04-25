import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("TypewriterText component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const typewriterText = read(
      "src/components/TypewriterText/TypewriterText.astro",
    );

    expect(typewriterText).toContain("data-typewriter");
    expect(typewriterText).toContain(
      'data-enhance={enhance ? "true" : "false"}',
    );
    expect(typewriterText).toContain("data-texts={JSON.stringify(texts)}");
    expect(typewriterText).toContain("data-type-speed={typeSpeed}");
    expect(typewriterText).toContain("data-erase-speed={eraseSpeed}");
    expect(typewriterText).toContain("data-pause-after={pauseAfter}");
    expect(typewriterText).toContain("data-pause-empty={pauseEmpty}");
    expect(typewriterText).toContain('data-loop={loop ? "true" : "false"}');
    expect(typewriterText).toContain('data-erase={erase ? "true" : "false"}');
    expect(typewriterText).toContain(".typewriter-static");
    expect(typewriterText).toContain(".typewriter-dynamic");
    expect(typewriterText).toContain("[data-typewriter-display]");
    expect(typewriterText).toContain("<script is:inline>");
    expect(typewriterText).toContain("prefers-reduced-motion: reduce");
    expect(typewriterText).toContain(
      "querySelectorAll('[data-typewriter][data-enhance=\"true\"]:not([data-ready])')",
    );
    expect(typewriterText).toContain("new MutationObserver(function ()");
    expect(typewriterText).toContain("new WeakMap()");
    expect(typewriterText).not.toContain("../../enhancers/");
    expect(typewriterText).not.toContain("client:");
    expect(typewriterText).not.toContain("astro:page-load");
  });
});
