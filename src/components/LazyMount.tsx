import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Defers mounting its children (and therefore fetching their code-split chunk +
 * running their JS) until the placeholder scrolls within `rootMargin` of the
 * viewport. This keeps below-the-fold sections — and the framer-motion they pull
 * in — off the initial-load main thread. A reserved `minHeight` keeps page
 * height / scroll position stable before mount. If the page is deep-linked to
 * this section (`#id`), it mounts immediately so the anchor resolves.
 */
export function LazyMount({
  children,
  id,
  minHeight = "60vh",
  rootMargin = "600px",
}: {
  children: ReactNode;
  id?: string;
  minHeight?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(
    () => typeof window !== "undefined" && !!id && window.location.hash === `#${id}`,
  );

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, rootMargin]);

  if (show) return <>{children}</>;
  return <div ref={ref} aria-hidden="true" style={{ minHeight }} />;
}
