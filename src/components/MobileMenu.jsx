"use client";
import Search from "@/components/Search";
import Link from "next/link";
import { useState } from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";

//https://jacobhocker.medium.com/creating-an-animated-hamburger-menu-in-nextjs-tailwind-css-9e332d428811
//https://greemjellyfish.medium.com/step-by-step-guide-how-to-add-a-responsive-hamburger-menu-in-next-js-using-css-752c5759ff3c

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // check previous value on click
  // if prev = false -> true (menu opens)
  // if prev = true -> false (menu closes)
  const handleClick = () => setIsOpen((prev) => !prev);
  // close menu function for when links are clicked
  const closeMenu = () => setIsOpen(false);

  return (
    // when menu is closed
    <div className="relative">
      <button
        onClick={handleClick}
        className="flex flex-col justify-center items-center w-8 h-8 z-50 relative"
      >
        <span
          className={`bg-white block h-0.5 w-6 rounded-sm transition-transform duration-300 ease-in-out transform ${
            isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1.5"
          }`}
        />
        <span
          className={`bg-white block h-0.5 w-6 rounded-sm transition-all duration-300 ease-in-out my-1 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`bg-white block h-0.5 w-6 rounded-sm transition-transform duration-300 ease-in-out transform ${
            isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1.5"
          }`}
        />
      </button>

      {/* when menu is open(true)  */}
      {isOpen && (
        <div
          className="fixed top-0 right-0 h-full 
      w-full md:w-1/2  bg-white flex flex-col items-start px-6 md:px-16 py-8 space-y-6 mt-16 md:mt-20 shadow-lg z-40"
        >
          <SignedIn>
            <UserButton />
          </SignedIn>

          <Link href="/" onClick={closeMenu} className="font-medium">
            Homepage
          </Link>
          <Link
            href="/games-catalogue"
            onClick={closeMenu}
            className="font-medium"
          >
            Games Catalogue
          </Link>
          <Link href="/profile" onClick={closeMenu} className="font-medium">
            Profile
          </Link>
          <Search />
        </div>
      )}
    </div>
  );
}
