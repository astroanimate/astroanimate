import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("ExpandableCard component contract", () => {
  it("keeps the package-safe enhancement contract in source", () => {
    const expandableCard = read(
      "src/components/ExpandableCard/ExpandableCard.astro",
    );

    expect(expandableCard).toContain("data-astro-expandable-card");
    expect(expandableCard).toContain("data-state={initialState}");
    expect(expandableCard).toContain(
      'data-enhance={enhance ? "true" : "false"}',
    );
    expect(expandableCard).toContain("--card-duration:");
    expect(expandableCard).toContain("--card-easing:");
    expect(expandableCard).toContain("<script is:inline>");
    expect(expandableCard).toContain("prefers-reduced-motion: reduce");
    expect(expandableCard).toContain(
      '[data-astro-expandable-card][data-enhance="true"]',
    );
    expect(expandableCard).toContain("querySelectorAll");
    expect(expandableCard).toContain("new MutationObserver");
    expect(expandableCard).not.toContain("../../enhancers/");
    expect(expandableCard).not.toContain("client:load");
    expect(expandableCard).not.toContain("client:visible");
    expect(expandableCard).not.toContain("astro:page-load");
  });
});
