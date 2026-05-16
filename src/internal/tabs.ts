import { canEnhance } from "./guards";

const initialized = new WeakMap<HTMLElement, () => void>();

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function enhanceAnimatedTabs(
  root: HTMLElement,
): (() => void) | undefined {
  if (typeof window === "undefined") return;
  
  // Criterion 6 — Reduced Motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  if (!canEnhance()) return;
  if (initialized.has(root)) return initialized.get(root);

  const tablist = root.querySelector("[data-tablist]") as HTMLElement | null;
  const indicator = root.querySelector(
    "[data-indicator]",
  ) as HTMLElement | null;

  const tabs = Array.from(
    root.querySelectorAll("[data-tab]"),
  ) as HTMLButtonElement[];
  const panels = Array.from(
    root.querySelectorAll("[data-panel]"),
  ) as HTMLElement[];

  if (!tablist || !indicator) return;
  if (tabs.length === 0 || panels.length === 0) return;

  const defaultTab = root.dataset.defaultTab;

  const findIndexById = (id: string | undefined | null) => {
    if (!id) return -1;
    return tabs.findIndex((t) => t.dataset.tabId === id);
  };

  let activeIndex = clamp(findIndexById(defaultTab), 0, tabs.length - 1);

  const setIndicatorTo = (tabEl: HTMLElement) => {
    const listRect = tablist.getBoundingClientRect();
    const tabRect = tabEl.getBoundingClientRect();

    const x = tabRect.left - listRect.left + tablist.scrollLeft;
    const w = tabRect.width;

    // Criterion 7 — CSS-First Architecture
    root.setAttribute("data-indicator-x", String(x));
    root.setAttribute("data-indicator-w", String(w));
  };

  const setActive = (nextIndex: number, opts?: { focus?: boolean }) => {
    const idx = clamp(nextIndex, 0, tabs.length - 1);
    activeIndex = idx;

    tabs.forEach((t, i) => {
      const isActive = i === idx;
      t.dataset.active = isActive ? "true" : "false";
      t.setAttribute("aria-selected", isActive ? "true" : "false");
      t.tabIndex = isActive ? 0 : -1;
    });

    const activeTab = tabs[idx];
    panels.forEach((p) => {
      const isActive = activeTab && p.dataset.panelId === activeTab.dataset.tabId;
      if (isActive) {
        p.dataset.active = "true";
        p.removeAttribute("hidden");
        p.setAttribute("aria-hidden", "false");
      } else {
        p.dataset.active = "false";
        p.setAttribute("hidden", "");
        p.setAttribute("aria-hidden", "true");
      }
    });

    if (activeTab) {
      setIndicatorTo(activeTab);
      if (opts?.focus) activeTab.focus();

      // Emit event for extensibility
      root.dispatchEvent(new CustomEvent("astroanimate:tabs:change", {
        detail: { index: idx, id: activeTab.dataset.tabId }
      }));
    }
  };

  const onClick = (e: Event) => {
    const target = e.target as HTMLElement | null;
    const btn = target?.closest("button[data-tab]") as HTMLButtonElement | null;
    if (!btn) return;

    const idx = tabs.indexOf(btn);
    if (idx === -1) return;

    setActive(idx, { focus: true });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const key = e.key;

    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      setActive((activeIndex + 1) % tabs.length, { focus: true });
      return;
    }

    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      setActive((activeIndex - 1 + tabs.length) % tabs.length, { focus: true });
      return;
    }

    if (key === "Home") {
      e.preventDefault();
      setActive(0, { focus: true });
      return;
    }

    if (key === "End") {
      e.preventDefault();
      setActive(tabs.length - 1, { focus: true });
      return;
    }
  };

  const onResize = () => {
    const active = tabs[activeIndex];
    if (active) setIndicatorTo(active);
  };

  tablist.addEventListener("click", onClick);
  tablist.addEventListener("keydown", onKeyDown);
  window.addEventListener("resize", onResize);

  root.dataset.enhanced = "true";
  root.dataset.ready = "true";

  setActive(activeIndex);
  
  // Initial position might need a frame to settle
  requestAnimationFrame(() => {
    const active = tabs[activeIndex];
    if (active) setIndicatorTo(active);
  });

  const destroy = () => {
    tablist.removeEventListener("click", onClick);
    tablist.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("resize", onResize);
    initialized.delete(root);
  };

  initialized.set(root, destroy);

  const cleanupObserver = new MutationObserver(() => {
    if (!document.contains(root)) {
      destroy();
      cleanupObserver.disconnect();
    }
  });
  cleanupObserver.observe(document.body, { childList: true, subtree: true });

  return destroy;
}
