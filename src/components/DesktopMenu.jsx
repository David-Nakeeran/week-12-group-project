"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "@/components/Search";

export default function DesktopMenu() {
  const currentRoute = usePathname();

  return (
    <div className="flex gap-6 items-center">
      <Search />
      <Link
        href="/"
        className={`${
          currentRoute === "/"
            ? "underline text-lg font-medium"
            : "text-white text-lg font-medium hover:underline"
        }`}
      >
        Homepage
      </Link>
      <Link
        href="/games-catalogue"
        className={`${
          currentRoute === "/games-catalogue"
            ? "underline text-lg font-medium"
            : "text-white text-lg font-medium hover:underline"
        }`}
      >
        Games Catalogue
      </Link>
      <Link
        href="/profile"
        className={`${
          currentRoute === "/profile"
            ? "underline text-lg font-medium"
            : "text-white text-lg font-medium hover:underline"
        }`}
      >
        Profile
      </Link>
    </div>
  );
}
