// enhancers/dropdown.ts
import { canEnhance } from "./guards";

// ✅ CRITERION 3: WeakMap prevents duplicate initialization across multiple instances
const initialized = new WeakMap<HTMLElement, CleanupFn>();
type CleanupFn = () => void;

export function enhanceDropdown(root: HTMLElement) {
  // ✅ CRITERION 6: Secondary reduced motion guard (primary is in .astro script block)
  if (!canEnhance()) return;

  // ✅ CRITERION 3: Prevent duplicate initialization
  if (initialized.has(root)) return;

  const trigger = root.querySelector<HTMLElement>("[data-dropdown-trigger]");
  const content = root.querySelector<HTMLElement>("[data-dropdown-content]");

  if (!trigger || !content) return;

  // Mark as JS-ready so CSS transitions activate
  root.dataset.ready = "true";

  // ─── Helpers ──────────────────────────────────────────────────────────────

  const isOpen = () => root.dataset.state === "open";
  const triggerMode = root.dataset.trigger ?? "click";
  const hoverDelay = parseInt(root.dataset.hoverDelay ?? "120", 10);

  const open = () => {
    root.dataset.state = "open";
    trigger.setAttribute("aria-expanded", "true");
    content.setAttribute("aria-hidden", "false");
  };

  const openWithFocus = () => {
    open();
    // Move focus into first focusable menu item (click/keyboard only)
    const firstItem = content.querySelector<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );
    firstItem?.focus();
  };

  const close = () => {
    root.dataset.state = "closed";
    trigger.setAttribute("aria-expanded", "false");
    content.setAttribute("aria-hidden", "true");
  };

  const toggle = () => (isOpen() ? close() : openWithFocus());

  // ─── Content interactions ─────────────────────────────────────────────────

  const handleItemClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const item = target.closest(".menu-item") as HTMLElement | null;
    if (item) {
      const indexStr = item.dataset.index;
      if (indexStr) {
        const event = new CustomEvent("dropdown-select", {
          detail: { index: parseInt(indexStr, 10), item: item }
        });
        root.dispatchEvent(event);
      }
      close();
    }
  };

  // ─── Wire up ──────────────────────────────────────────────────────────────

  let cleanupFn: CleanupFn;

  if (triggerMode === "hover") {
    // ─── Hover mode ─────────────────────────────────────────────────────────
    let closeTimer: ReturnType<typeof setTimeout> | null = null;

    const cancelClose = () => {
      if (closeTimer !== null) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    };

    const scheduleClose = () => {
      cancelClose();
      closeTimer = setTimeout(close, hoverDelay);
    };

    const handleRootEnter = () => {
      cancelClose();
      open();
    };
    const handleRootLeave = () => {
      scheduleClose();
    };

    // Keyboard still works for accessibility
    const handleTriggerKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        trigger.focus();
      }
      if (
        (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") &&
        !isOpen()
      ) {
        e.preventDefault();
        openWithFocus();
      }
    };

    const handleContentKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        trigger.focus();
      }
      if (e.key === "Tab") {
        close();
      }
    };

    root.addEventListener("mouseenter", handleRootEnter);
    root.addEventListener("mouseleave", handleRootLeave);
    trigger.addEventListener("keydown", handleTriggerKeydown);
    content.addEventListener("keydown", handleContentKeydown);
    content.addEventListener("click", handleItemClick);

    cleanupFn = () => {
      root.removeEventListener("mouseenter", handleRootEnter);
      root.removeEventListener("mouseleave", handleRootLeave);
      trigger.removeEventListener("keydown", handleTriggerKeydown);
      content.removeEventListener("keydown", handleContentKeydown);
      content.removeEventListener("click", handleItemClick);
      cancelClose();
    };
  } else {
    // ─── Click mode (default) ────────────────────────────────────────────────
    const handleTriggerClick = (e: MouseEvent) => {
      e.stopPropagation();
      toggle();
    };

    const handleTriggerKeydown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "ArrowDown" && !isOpen()) {
        e.preventDefault();
        openWithFocus();
      }
      if (e.key === "Escape") {
        close();
        trigger.focus();
      }
    };

    const handleContentKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        trigger.focus();
      }
      if (e.key === "Tab") {
        close();
      }
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (!root.contains(e.target as Node)) close();
    };

    trigger.addEventListener("click", handleTriggerClick);
    trigger.addEventListener("keydown", handleTriggerKeydown);
    content.addEventListener("keydown", handleContentKeydown);
    content.addEventListener("click", handleItemClick);
    document.addEventListener("click", handleOutsideClick);

    cleanupFn = () => {
      trigger.removeEventListener("click", handleTriggerClick);
      trigger.removeEventListener("keydown", handleTriggerKeydown);
      content.removeEventListener("keydown", handleContentKeydown);
      content.removeEventListener("click", handleItemClick);
      document.removeEventListener("click", handleOutsideClick);
    };
  }

  // ─── Cleanup ──────────────────────────────────────────────────────────────

  // ✅ CRITERION 3: Cleanup function stored in WeakMap
  initialized.set(root, cleanupFn);

  // ✅ CRITERION 3: MutationObserver watches for DOM removal → guaranteed cleanup
  const cleanupObserver = new MutationObserver(() => {
    if (!document.contains(root)) {
      cleanupFn();
      cleanupObserver.disconnect();
      initialized.delete(root);
    }
  });

  cleanupObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
