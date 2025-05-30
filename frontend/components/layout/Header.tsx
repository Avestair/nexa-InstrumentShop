"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { PiMagnifyingGlassDuotone, PiUserCircleDuotone } from "react-icons/pi";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: "فروشگاه", href: "/shop" },
    { name: "درباره ما", href: "/about" },
    { name: "ارتباط با ما", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Home Link */}
        <Link
          href="/"
          className="text-2xl font-bold text-black"
          aria-label="Go to homepage"
        >
          <span className="sr-only">my shop</span>
          Site's Logo
        </Link>

        {/* Primary Navigation */}
        <nav className="hidden space-x-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-medium text-black hover:text-gray-600"
              aria-label={`Go to ${item.name} page`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons (Search, Account, Mobile Menu Toggle) */}
        <div className="flex items-center space-x-4">
          <button
            className="cursor-pointer text-black transition-colors duration-300 hover:text-gray-600"
            aria-label="Search"
          >
            <PiMagnifyingGlassDuotone className="size-6" aria-hidden="true" />
          </button>

          <Link
            href="/account"
            className="text-black transition-colors duration-300 hover:text-gray-600"
            aria-label="Go to your account"
          >
            <PiUserCircleDuotone className="size-6" aria-hidden="true" />
          </Link>

          {/* Mobile Menu Toggle Button (Hamburger Icon) */}
          <button
            onClick={toggleMenu}
            className="flex flex-col space-y-1 md:hidden"
            aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMenuOpen}
          >
            <motion.span
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 45, y: 5 },
                closed: { rotate: 0, y: 0 },
              }}
              className="block h-0.5 w-6 bg-black"
            ></motion.span>
            <motion.span
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                open: { opacity: 0 },
                closed: { opacity: 1 },
              }}
              className="block h-0.5 w-6 bg-black"
            ></motion.span>
            <motion.span
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                open: { rotate: -45, y: -5 },
                closed: { rotate: 0, y: 2 },
              }}
              className="relative bottom-[1.9px] block h-0.5 w-6 bg-black"
            ></motion.span>
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        navItems={navItems}
      />
    </header>
  );
}
