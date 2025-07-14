"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SortGameFilter({ genres, platforms }) {
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const router = useRouter();

  const genreElements = genres.map((element) => {
    return (
      <option key={element.id} value={element.slug}>
        {element.name}
      </option>
    );
  });

  const platformElements = platforms.map((element) => {
    return (
      <option key={element.id} value={element.id}>
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
    <div>
      <select onChange={handleGenreChange} defaultValue={"Genre"}>
        <option disabled="disabled">Genre</option>
        {genreElements}
      </select>
      <select onChange={handlePlatformChange} defaultValue={"Platform"}>
        <option disabled="disabled">Platform</option>
        {platformElements}
      </select>
    </div>
  );
}
