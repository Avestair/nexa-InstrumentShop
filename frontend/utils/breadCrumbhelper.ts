"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const pathSegments = pathname.split("/").filter(Boolean);

    // custom labels for specific paths
    const customLabels: Record<string, string> = {
      category: "Products",
      account: "My Account",
    };

    return pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const isLast = index === pathSegments.length - 1;

      return {
        label:
          customLabels[segment] ||
          segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        href: isLast ? undefined : href,
        active: isLast,
      };
    });
  }, [pathname]);

  // Always include home as the first item
  return [{ label: "Home", href: "/" }, ...breadcrumbs];
}
