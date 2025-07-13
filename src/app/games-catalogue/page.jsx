import Search from "@/components/Search";
import Image from "next/image";

const apiKey = process.env.API_KEY;
const baseUrl = process.env.API_BASE_URL;

export default async function GamesCataloguePage({ searchParams }) {
  const query = await searchParams.search;

  const url = `${baseUrl}?key=${apiKey}&search=${query}`;

  // Will replace with fetchFromAPI()

  async function getSearchData() {
    try {
      const response = await fetch(url);
      if (!response) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      console.error(message);
    }
  }

  let games = [];
  if (query) {
    games = (await getSearchData()) || [];
  }

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

  return (
    <main className="w-full grid place-items-center pl-[1.375rem] pr-[1.375rem]">
      <h1>Games Catalogue Page</h1>
      <Search />
      <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(250px,1fr))]">
        {gameElements}
      </div>
    </main>
  );
}
