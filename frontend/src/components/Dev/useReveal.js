import { useEffect, useRef } from 'react';

/**
 * useReveal — observes elements with dev-reveal*, dev-divider-line classes
 * and adds 'is-visible' when they enter the viewport.
 */
export function useReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll(
      '.dev-reveal, .dev-reveal-left, .dev-reveal-right, .dev-reveal-scale, .dev-divider-line'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '0px 0px -50px 0px',
      }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return ref;
}
