import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type ObserverRecord = {
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit | undefined;
  observed: Element[];
  disconnected: boolean;
};

type MutationRecordMock = {
  callback: MutationCallback;
  observed: Node[];
  disconnected: boolean;
};

const intersectionObservers: ObserverRecord[] = [];
const mutationObservers: MutationRecordMock[] = [];

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit | undefined;
  observed: Element[] = [];
  disconnected = false;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
    intersectionObservers.push(this);
  }

  observe(element: Element) {
    this.observed.push(element);
  }

  unobserve() {}

  disconnect() {
    this.disconnected = true;
  }
}

class MockMutationObserver {
  callback: MutationCallback;
  observed: Node[] = [];
  disconnected = false;

  constructor(callback: MutationCallback) {
    this.callback = callback;
    mutationObservers.push(this);
  }

  observe(target: Node) {
    this.observed.push(target);
  }

  disconnect() {
    this.disconnected = true;
  }
}

describe("fadein internal enhancer", () => {
  beforeEach(() => {
    vi.resetModules();
    intersectionObservers.length = 0;
    mutationObservers.length = 0;
    document.body.innerHTML = "";

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    vi.stubGlobal("MutationObserver", MockMutationObserver);
    window.matchMedia = vi
      .fn()
      .mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  it("enhances a root using dataset threshold and root margin", async () => {
    const { enhanceFadeIn } = await import("../src/internal/fadein");
    const root = document.createElement("div");
    root.dataset.once = "false";
    root.dataset.threshold = "0.35";
    root.dataset.rootMargin = "10px";
    document.body.append(root);

    const events: string[] = [];
    root.addEventListener("astro:fadein:init", () => events.push("init"));
    root.addEventListener("astro:fadein:visible", () => events.push("visible"));
    root.addEventListener("astro:fadein:hidden", () => events.push("hidden"));

    enhanceFadeIn(root);

    expect(root.dataset.state).toBe("hidden");
    expect(events).toEqual(["init"]);
    expect(intersectionObservers).toHaveLength(1);
    expect(intersectionObservers[0]?.options).toEqual({
      threshold: 0.35,
      rootMargin: "10px",
    });

    intersectionObservers[0]?.callback(
      [{ isIntersecting: true, target: root } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    expect(root.dataset.state).toBe("visible");

    intersectionObservers[0]?.callback(
      [{ isIntersecting: false, target: root } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    expect(root.dataset.state).toBe("hidden");
    expect(events).toEqual(["init", "visible", "hidden"]);
  });

  it("boots existing and newly added enhanced roots once", async () => {
    const { bootFadeIn } = await import("../src/internal/fadein");
    const first = document.createElement("div");
    first.setAttribute("data-astro-fade-in", "");
    first.dataset.enhance = "true";
    first.dataset.once = "true";
    document.body.append(first);

    bootFadeIn();

    expect(first.dataset.ready).toBe("true");
    expect(intersectionObservers).toHaveLength(1);
    expect(mutationObservers.length).toBeGreaterThanOrEqual(2);

    const dynamic = document.createElement("div");
    dynamic.setAttribute("data-astro-fade-in", "");
    dynamic.dataset.enhance = "true";
    dynamic.dataset.once = "true";
    document.body.append(dynamic);

    mutationObservers[0]?.callback([
      {
        addedNodes: [dynamic],
      } as unknown as MutationRecord,
    ], {} as MutationObserver);

    expect(dynamic.dataset.ready).toBe("true");
    expect(intersectionObservers).toHaveLength(2);
  });
});
