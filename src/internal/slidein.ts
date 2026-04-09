import { canEnhance } from "./guards";

type CleanupFn = () => void;

const initialized = new WeakMap<HTMLElement, CleanupFn>();
const selector = '[data-astro-slide-in][data-enhance="true"]:not([data-ready])';

let bootstrapObserver: MutationObserver | null = null;
let managedRoots = 0;

const parseThreshold = (value: string | undefined) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0.1;
  return Math.min(Math.max(parsed, 0), 1);
};

const emitSlideInEvent = (
  root: HTMLElement,
  state: "init" | "visible" | "hidden",
) => {
  root.dispatchEvent(
    new CustomEvent(`astro:slidein:${state}`, {
      bubbles: true,
      detail: {
        once: root.dataset.once === "true",
        enhance: root.dataset.enhance === "true",
      },
    }),
  );
};

const initElement = (element: Element) => {
  if (!(element instanceof HTMLElement)) return;
  if (element.dataset.ready === "true") return;
  element.dataset.ready = "true";
  enhanceSlideIn(element);
};

const initSlideIns = (root: ParentNode = document) => {
  root.querySelectorAll(selector).forEach(initElement);
};

const ensureBootstrapObserver = () => {
  if (bootstrapObserver || typeof document === "undefined") return;

  bootstrapObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node.matches(selector)) initElement(node);
        initSlideIns(node);
      });
    });
  });

  bootstrapObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

const maybeDisconnectBootstrapObserver = () => {
  if (managedRoots > 0 || !bootstrapObserver) return;
  bootstrapObserver.disconnect();
  bootstrapObserver = null;
};

export function bootSlideIn(root: ParentNode = document) {
  if (!canEnhance()) return;
  ensureBootstrapObserver();
  initSlideIns(root);
}

export function enhanceSlideIn(root: HTMLElement) {
  if (!canEnhance()) return;
  if (initialized.has(root)) return;

  root.dataset.state = "hidden";
  managedRoots += 1;
  emitSlideInEvent(root, "init");

  const isOnce = root.dataset.once === "true";
  const threshold = parseThreshold(root.dataset.threshold);
  const rootMargin = root.dataset.rootMargin?.trim() || "0px 0px -10% 0px";
  let isCleanedUp = false;

  const cleanup = () => {
    if (isCleanedUp) return;
    isCleanedUp = true;
    observer.disconnect();
    cleanupObserver.disconnect();
    initialized.delete(root);
    managedRoots = Math.max(0, managedRoots - 1);
    maybeDisconnectBootstrapObserver();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          root.dataset.state = "visible";
          emitSlideInEvent(root, "visible");
          if (isOnce) cleanup();
        } else if (!isOnce) {
          root.dataset.state = "hidden";
          emitSlideInEvent(root, "hidden");
        }
      });
    },
    {
      threshold,
      rootMargin,
    },
  );

  observer.observe(root);
  initialized.set(root, cleanup);

  const cleanupObserver = new MutationObserver(() => {
    if (!document.contains(root)) cleanup();
  });

  cleanupObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
