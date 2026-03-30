import { afterEach, describe, expect, it, vi } from "vitest";

import { canEnhance } from "../src/internal/guards";

describe("canEnhance", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns false when reduced motion is preferred", () => {
    vi.stubGlobal("window", {
      matchMedia: vi.fn().mockReturnValue({ matches: true }),
    });

    expect(canEnhance()).toBe(false);
  });

  it("returns true when motion is allowed", () => {
    vi.stubGlobal("window", {
      matchMedia: vi.fn().mockReturnValue({ matches: false }),
    });

    expect(canEnhance()).toBe(true);
  });
});
