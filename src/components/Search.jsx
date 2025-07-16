"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  async function handleSearch(e) {
    if (e.key === "Enter" && query.trim() !== "") {
      router.push(
        `/games-catalogue?search=${encodeURIComponent(query)}#game-results`
      );
      setQuery("");
    }
  }
  return (
    <input
      type="text"
      placeholder="Search"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
      onKeyDown={handleSearch}
      className="border border-neutral-400 rounded-lg bg-white px-2 py-1 w-full lg:w-auto"
    />
  );
}
