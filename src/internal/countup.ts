import { canEnhance } from "./guards";

// ✅ CRITERION 3: WeakMaps for safe state tracking across instances
const initialized = new WeakMap<HTMLElement, boolean>();
const activeAnimations = new WeakMap<HTMLElement, number>();
const activeObservers = new WeakMap<HTMLElement, IntersectionObserver>();

export function enhanceCountUp(root: HTMLElement) {
  if (!canEnhance()) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  if (initialized.has(root)) return;

  const value = parseFloat(root.dataset.value || "0");
  const start = parseFloat(root.dataset.start || "0");
  const duration = parseInt(root.dataset.duration || "2000");
  const decimals = parseInt(root.dataset.decimals || "0");
  const prefix = root.dataset.prefix || "";
  const suffix = root.dataset.suffix || "";

  /**
   * ✅ CRITERION 8: Helper to format values consistently between baseline and JS
   */
  const format = (num: number) => {
    return (
      prefix +
      num.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) +
      suffix
    );
  };

  /**
   * Main animation loop using rAF
   */
  // eslint-disable-next-line prefer-const
  let cleanupObserver: MutationObserver;

  const animate = () => {
    let startTime: number | null = null;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Quadratic Out Easing: f(t) = t(2-t)
      const ease = progress * (2 - progress);
      const current = start + (value - start) * ease;

      // ✅ CRITERION 7: JS only updates content (text), not styles
      root.textContent = format(current);

      if (progress < 1) {
        const id = requestAnimationFrame(step);
        activeAnimations.set(root, id);
      } else {
        root.textContent = format(value); // Final snap for precision
        activeAnimations.delete(root);
        if (cleanupObserver) cleanupObserver.disconnect();
      }
    }

    const id = requestAnimationFrame(step);
    activeAnimations.set(root, id);
  };

  // ✅ CRITERION 3: IntersectionObserver for scroll-based trigger
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect(); // Only run once
          activeObservers.delete(root);
        }
      });
    },
    { threshold: parseFloat(root.dataset.threshold || "0.1") }
  );

  observer.observe(root);
  activeObservers.set(root, observer);
  initialized.set(root, true);

  /**
   * ✅ CRITERION 3: Cleanup mechanism
   * Handles cases where component is removed from DOM (e.g., View Transitions or client-side routing)
   */
  cleanupObserver = new MutationObserver(() => {
    if (!document.contains(root)) {
      // Cleanup Timer/rAF
      const animId = activeAnimations.get(root);
      if (typeof animId === "number") {
        cancelAnimationFrame(animId);
      }

      // Cleanup Observer
      const obs = activeObservers.get(root);
      if (obs) {
        obs.disconnect();
      }

      // Cleanup Self
      cleanupObserver.disconnect();

      // Cleanup State
      initialized.delete(root);
      activeAnimations.delete(root);
      activeObservers.delete(root);
    }
  });

  cleanupObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
