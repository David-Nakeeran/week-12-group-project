"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SortGameFilter({ genres, platforms }) {
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const router = useRouter();

  const genreElements = genres.map((element) => {
    return (
      <option
        key={element.id}
        value={element.slug}
        className="text-neutral-900"
      >
        {element.name}
      </option>
    );
  });

  const platformElements = platforms.map((element) => {
    return (
      <option key={element.id} value={element.id} className="text-neutral-900">
        {element.name}
      </option>
    );
  });

  function updateParams(selectedGenre, selectedPlatform) {
    const params = new URLSearchParams();

    if (selectedGenre) params.set("genres", selectedGenre);
    if (selectedPlatform) params.set("platforms", selectedPlatform);

    router.push(`/games-catalogue?${params.toString()}`);
  }

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;
    setGenre(selectedGenre);
    updateParams(selectedGenre, platform);
  };

  const handlePlatformChange = (e) => {
    const selectedPlatform = e.target.value;
    setPlatform(selectedPlatform);
    updateParams(genre, selectedPlatform);
  };

  return (
    <div className="flex gap-2 mt-[0.75rem] mb-[1.2rem]">
      <select
        className="bg-transparent text-[#FFF] border border-[#CDCCCC] font-bold rounded-[0.625rem] p-2 w-full"
        onChange={handleGenreChange}
        defaultValue={"Genre"}
      >
        <option disabled="disabled">Genre</option>
        {genreElements}
      </select>
      <select
        className="bg-transparent text-[#FFF] border border-[#CDCCCC] font-bold rounded-[0.625rem] p-2 w-full"
        onChange={handlePlatformChange}
        defaultValue={"Platform"}
      >
        <option disabled="disabled">Platform</option>
        {platformElements}
      </select>
    </div>
  );
}
