"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LoggedInNav() {
  const currentRoute = usePathname();
  return (
    <>
      <div className="flex gap-6 justify-evenly items-center">
        <Link
          href={"/"}
          className={`${
            currentRoute === "/"
              ? "text-emerald-600 text-lg font-medium "
              : "text-neutral-900 text-lg font-medium hover:underline"
          }`}
        >
          Homepage
        </Link>
        <Link
          href={"/games-catalogue"}
          className={`${
            currentRoute === "/games-catalogue"
              ? "text-emerald-600 text-lg font-medium "
              : "text-neutral-900 text-lg font-medium hover:underline"
          }`}
        >
          Games Catalogue
        </Link>
        <Link
          href={"/profile"}
          className={`${
            currentRoute === "/profile"
              ? "text-emerald-600 text-lg font-medium"
              : "text-neutral-900 text-lg font-medium hover:underline"
          }`}
        >
          My profile
        </Link>
      </div>
    </>
  );
}
