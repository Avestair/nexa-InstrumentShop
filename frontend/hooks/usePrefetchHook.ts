import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export const usePrefetchOnHover = (href, delay = 1000) => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isPrefetchedRef = useRef(false);

  const prefetch = () => {
    if (!isPrefetchedRef.current) {
      router.prefetch(href);
      isPrefetchedRef.current = true;
      console.log(`Prefetched route: ${href}`);
    }
  };

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(prefetch, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { handleMouseEnter, handleMouseLeave };
};
