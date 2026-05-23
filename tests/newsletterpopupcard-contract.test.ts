import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("NewsletterPopupCard component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const component = read("src/components/NewsletterPopupCard/NewsletterPopupCard.astro");

    expect(component).not.toContain("../../enhancers/");
    expect(component).not.toContain("client:");
    expect(component).not.toContain("astro:page-load");
    expect(component).toContain("data-newsletter-form");
    expect(component).toContain("prefers-reduced-motion: reduce");
  });
});
