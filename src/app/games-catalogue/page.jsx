import Search from "@/components/Search";
import fetchFromAPI from "@/lib/rawgApi";
import GameImageSlider from "@/components/GameImageSlider";
import Image from "next/image";

export default async function GamesCataloguePage({ searchParams }) {
  const query = await searchParams.search;

  const games = (await fetchFromAPI(`&search=${query}&page_size=6`)) || [];
  console.log(games);

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
  console.log(topGames);

  return (
    <main className="w-full grid place-items-center pl-[1.375rem] pr-[1.375rem]">
      <Search />
      <h1>Top Rated Games</h1>
      <GameImageSlider games={topGames} />
      <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(250px,1fr))]">
        <h2>Browse Games</h2>
        <p></p>
        {gameElements}
      </div>
    </main>
  );
}
