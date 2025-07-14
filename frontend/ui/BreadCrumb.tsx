"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export default function Breadcrumb({
  separator = "/",
  className,
  itemClassName = "text-gray-500 hover:text-black",
  activeItemClassName = "text-black",
}: {
  separator?: React.ReactNode;
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;
}) {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const pathSegments = pathname.split("/").filter(Boolean);

    const customLabels: Record<string, string> = {
      category: "Products",
      account: "My Account",
      // Add more custom mappings as needed
    };

    const crumbs = pathSegments.map((segment, index) => {
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

    return [{ label: "Home", href: "/" }, ...crumbs];
  }, [pathname]);

  const baseClassName = "mb-4 w-fit rounded-full text-xs bg-gray-50 px-4";

  const mergedClassName = twMerge(baseClassName, className);

  return (
    <nav className={mergedClassName} aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-2">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              {item.href ? (
                <Link
                  href={item.href}
                  className={`${itemClassName} ${
                    item.active ? activeItemClassName : ""
                  }`}
                  aria-current={item.active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={item.active ? activeItemClassName : itemClassName}
                  aria-current={item.active ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
            {index < breadcrumbs.length - 1 && (
              <li aria-hidden="true">{separator}</li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
