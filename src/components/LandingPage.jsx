import Link from "next/link";
import Image from "next/image";
import heroImg from "@/../public/images/heroImg.jpg";

export default async function LandingPage() {
  const getGames = async () => {
    const apiKey = process.env.API_KEY;
    const url = `https://api.rawg.io/api/games?key=${apiKey}&metacritic=90,100&page_size=6`;

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
  };

  const games = (await getGames()) || [];
  console.log(games);

  const gameElements = games.map((game) => {
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
        <span>Metacritic: {game.metacritic}</span>
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
    <main className="w-full grid place-items-center">
      <Image
        src={heroImg}
        alt="a close up of keyboard and video game controller"
        width={348}
        height={348}
      />
      <div className="w-full flex flex-col gap-[1.75rem] mb-[2.5rem]">
        <h1 className="text-4xl mb-7 font-semibold text-center">
          Welcome to GameVault
        </h1>
        <h3>
          Your personal vault for tracking, rating, and conquering your video
          game backlog.
        </h3>
        <p>
          Tired of forgetting what games you&apos;ve finished, started, or never
          even touched? GameVault helps you organize your entire game collection
          — from "must plays" to hidden gems — with a clean, retro-inspired
          interface. Log what you're playing, track your progress, and relive
          the games you've conquered.
        </p>
        <Link href={"/sign-up"}>Join</Link>
      </div>
      <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(250px,1fr))]">
        {gameElements}
      </div>
    </main>
  );
}
