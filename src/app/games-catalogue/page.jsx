import fetchFromAPI from "@/lib/rawgApi";
import { fetchGenresFromAPI, fetchPlatformsFromAPI } from "@/lib/rawgApi";
import GameImageSlider from "@/components/GameImageSlider";
import SortGameFilter from "@/components/SortGameFilter";
import Link from "next/link";
import Image from "next/image";

export default async function GamesCataloguePage({ searchParams }) {
  const query = await searchParams.search;
  const genre = await searchParams.genres;
  const platform = await searchParams.platforms;

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
      <div key={game.id} className="flex flex-col gap-1 items-center ">
        <Link href={`games-details/${game.id}`}>
          <Image
            src={game.background_image}
            alt="game"
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: "80%", height: "auto" }}
          />
          <p>{game.name}</p>
          <p>Metacritic: {game.metacritic}</p>
          <p>
            {game.genres
              .map((genre) => {
                return genre.name;
              })
              .join(", ")}
          </p>
          <p>
            {game.parent_platforms
              .map((element) => {
                return element.platform.name;
              })
              .join(", ")}
          </p>
        </Link>
      </div>
    );
  });

  const topGames = (await fetchFromAPI(`metacritic=95, 100&page_size=3`)) || [];

  return (
    <main className="w-full grid place-items-center pl-[1.375rem] pr-[1.375rem]">
      <h1 className="mb-[1.5rem]">Top Rated Games</h1>
      <div className="w-full mb-[2.5rem]">
        <GameImageSlider games={topGames} />
      </div>
      <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(250px,1fr))]">
        <h2 className="mb-[1.5rem]">Browse Games</h2>
        <div className="flex flex-col mb-[1.5rem]">
          <p className="mb-[0.75]">Sort by:</p>
          <SortGameFilter genres={genres} platforms={platforms} />
        </div>
        {gameElements}
      </div>
    </main>
  );
}
