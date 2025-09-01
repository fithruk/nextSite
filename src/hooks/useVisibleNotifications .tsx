import { RefObject, useEffect, useState } from "react";

const useVisibleNotifications = (
  containerRef: RefObject<HTMLDivElement | null>,
  deps: unknown[] = []
) => {
  const [visibleIds, setVisibleIds] = useState<string[]>([]);

  useEffect(() => {
    if (!containerRef || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIds((prev) => {
          const newVisible = [...prev];
          entries.forEach((entry) => {
            const id = entry.target.getAttribute("data-id");
            if (!id) return;

            if (entry.isIntersecting) {
              if (!newVisible.includes(id)) newVisible.push(id);
            } else {
              const idx = newVisible.indexOf(id);
              if (idx > -1) newVisible.splice(idx, 1);
            }
          });
          return [...newVisible];
        });
      },
      {
        root: containerRef.current,
      }
    );

    const items = containerRef.current.querySelectorAll("[data-id]");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, deps);

  return visibleIds;
};

export { useVisibleNotifications };
