import fetchFromAPI from "@/lib/rawgApi";
import { fetchGenresFromAPI, fetchPlatformsFromAPI } from "@/lib/rawgApi";
import GameImageSlider from "@/components/GameImageSlider";
import SortGameFilter from "@/components/SortGameFilter";
import GameCard from "@/components/GameCard";
import Search from "@/components/Search";
import ellipsepink from "@/../public/images/bg-imgs/ellipsepink.svg";
import ellipseblue from "@/../public/images/bg-imgs/ellipseblue.svg";
import Image from "next/image";

export default async function GamesCataloguePage({ searchParams }) {
  const query = (await searchParams).search;
  const genre = (await searchParams).genres;
  const platform = (await searchParams).platforms;

  let queryString = "";

  if (query) {
    queryString += `&search=${query}`;
  }

  if (genre) {
    queryString += `&genres=${genre}`;
  }

  if (platform) {
    queryString += `&platforms=${platform}`;
  }

  if (!query && !genre && !platform) {
    const randomPage = Math.floor(Math.random() * 10) + 1;
    queryString += `&page=${randomPage}`;
  }

  queryString += `&page_size=6`;

  const games = await fetchFromAPI(queryString);

  const genres = (await fetchGenresFromAPI()) || [];
  const platforms = (await fetchPlatformsFromAPI()) || [];

  const gameElements = games.map((game) => {
    return (
      <div key={game.id}>
        <GameCard game={game} />
      </div>
    );
  });

  const topGames = (await fetchFromAPI(`metacritic=95, 100&page_size=3`)) || [];

  return (
    <main className="w-full max-w-[1022px] grid place-items-center pl-[1.375rem] pr-[1.375rem] justify-self-center">
      <Image
        src={ellipsepink}
        width="800"
        height="800"
        className="absolute -z-10 top-0 left-0"
        alt="gradient pink effect"
      />
      <Image
        src={ellipseblue}
        width="800"
        height="800"
        className="absolute -z-10 top-0 right-0"
        alt="gradient blue effect"
      />
      <h1 className="mb-[1.5rem]">Top Rated Games</h1>
      <div className="w-full mb-[2.5rem]">
        <GameImageSlider games={topGames} />
      </div>
      <div id="game-results" className="w-full grid gap-[1.5rem]">
        <div className="flex flex-col gap-2 max-w-[300px]">
          <h2 className="text-[1.25rem]">Browse Games</h2>
          <Search />
          {query && (
            <p className="text-[1rem] sm:text-[1.1rem]">
              You searched for: {query}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start sm:items-end justify-end gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[1rem] whitespace-nowrap sm:pb-[0.52rem]">
              Sort by:
            </p>
            <SortGameFilter genres={genres} platforms={platforms} />
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-[1.5rem]">
          {gameElements}
        </div>
      </div>
    </main>
  );
}
