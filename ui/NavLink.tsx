"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { PiCaretDown } from "react-icons/pi";

export interface DropDownItem {
  title: string;
  url: string;
}

interface NavLinkProps {
  title: string;
  url: string;
  className?: string;
  isDropDown?: boolean;
  dropDownItems?: DropDownItem[];
  dropDownLabel?: string;
}

export default function NavLink({
  title,
  url,
  className = "",
  isDropDown = false,
  dropDownItems = [],
  dropDownLabel,
}: NavLinkProps) {
  const currentRoute = usePathname();

  if (isDropDown) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span
            className={`text-my-text cursor-pointer md:text-lg ${className}`}
          >
            {title}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {dropDownLabel && (
            <DropdownMenuLabel className="flex gap-1">
              <PiCaretDown className="size-6" />
              <span>{dropDownLabel}</span>
            </DropdownMenuLabel>
          )}
          {dropDownItems.map((item, index) => (
            <div key={index}>
              <DropdownMenuItem className="cursor-pointer">
                <Link
                  className={`${currentRoute === item.url ? "text-my-primary" : ""}`}
                  href={item.url}
                >
                  {item.title}
                </Link>
              </DropdownMenuItem>
              {index < dropDownItems.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link className={`text-my-text md:text-lg ${className}`} href={url}>
      {title}
    </Link>
  );
}
