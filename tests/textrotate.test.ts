import { describe, expect, it } from "vitest";

import { getTextRotateVariantStyles } from "../src/internal/textrotate";

describe("getTextRotateVariantStyles", () => {
  it("returns upward motion styles for slideUp", () => {
    expect(getTextRotateVariantStyles("slideUp")).toEqual({
      enterFrom: "translateY(100%)",
      exitTo: "translateY(-120%)",
    });
  });

  it("returns downward motion styles for slideDown", () => {
    expect(getTextRotateVariantStyles("slideDown")).toEqual({
      enterFrom: "translateY(-100%)",
      exitTo: "translateY(120%)",
    });
  });

  it("returns neutral transform styles for fade", () => {
    expect(getTextRotateVariantStyles("fade")).toEqual({
      enterFrom: "none",
      exitTo: "none",
    });
  });
});
