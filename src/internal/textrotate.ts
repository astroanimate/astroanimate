import { canEnhance } from "./guards";

const initialized = new WeakMap<HTMLElement, number>();

export function enhanceTextRotate(root: HTMLElement) {
  if (!canEnhance()) return;
  if (initialized.has(root)) return;

  const count = Number(root.dataset.count || "0");
  if (count <= 1) return;

  const items = root.querySelectorAll<HTMLElement>(
    ".astro-text-rotate__item[data-index]"
  );
  if (!items.length) return;

  let current = 0;
  root.setAttribute("data-current", "0");
  items[0].setAttribute("data-state", "enter");

  const intervalMs = Number(root.dataset.interval || "2000");
  const durationMs = Number(root.dataset.duration || "500");

  const timer = window.setInterval(() => {
    const next = (current + 1) % count;

    items[current]?.setAttribute("data-state", "exit");
    items[next]?.setAttribute("data-state", "enter");

    root.setAttribute("data-current", String(next));
    current = next;

    setTimeout(() => {
      items.forEach((item, i) => {
        if (i === current) item.setAttribute("data-state", "enter");
        else item.removeAttribute("data-state");
      });
    }, durationMs);
  }, intervalMs);

  initialized.set(root, timer);

  const observer = new MutationObserver(() => {
    if (!document.contains(root)) {
      clearInterval(timer);
      observer.disconnect();
      initialized.delete(root);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
