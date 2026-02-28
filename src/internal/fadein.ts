import { canEnhance } from "./guards";

const initialized = new WeakMap<HTMLElement, IntersectionObserver>();

export function enhanceFadeIn(root: HTMLElement) {
  if (!canEnhance()) return;
  if (initialized.has(root)) return;

  root.dataset.state = "hidden";

  const isOnce = root.dataset.once === "true";
  const threshold = 0.1;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          root.dataset.state = "visible";
          if (isOnce) {
            observer.unobserve(root);
            observer.disconnect();
          }
        } else if (!isOnce) {
          root.dataset.state = "hidden";
        }
      });
    },
    {
      threshold,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  observer.observe(root);
  initialized.set(root, observer);

  const cleanupObserver = new MutationObserver(() => {
    if (!document.contains(root)) {
      observer.disconnect();
      cleanupObserver.disconnect();
      initialized.delete(root);
    }
  });

  cleanupObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
