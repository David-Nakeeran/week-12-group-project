import Search from "@/components/Search";
import fetchFromAPI from "@/lib/rawgApi";
import { fetchGenresFromAPI, fetchPlatformsFromAPI } from "@/lib/rawgApi";
import GameImageSlider from "@/components/GameImageSlider";
import SortGameFilter from "@/components/SortGameFilter";
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
    console.log(game);
    return (
      <div key={game.id} className="flex flex-col gap-1 items-center ">
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
      </div>
    );
  });

  const topGames = (await fetchFromAPI(`metacritic=95, 100&page_size=3`)) || [];

  return (
    <main className="w-full grid place-items-center pl-[1.375rem] pr-[1.375rem]">
      <Search />
      <h1>Top Rated Games</h1>
      <GameImageSlider games={topGames} />
      <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(250px,1fr))]">
        <h2>Browse Games</h2>
        <p>Sort by:</p>
        <SortGameFilter genres={genres} platforms={platforms} />
        {gameElements}
      </div>
    </main>
  );
}
