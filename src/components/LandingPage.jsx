import Link from "next/link";
import Image from "next/image";
import fetchFromAPI from "@/lib/rawgApi";
import heroImg from "@/../public/images/heroImg.jpg";

export default async function LandingPage() {
  const games = (await fetchFromAPI("metacritic=90,100&page_size=6")) || [];
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
      <div className="w-full flex flex-col items-center sm:flex-row">
        <Image
          src={heroImg}
          alt="a close up of keyboard and video game controller"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto"
        />
        <div className="w-full flex flex-col gap-[1.75rem] mb-[2.5rem]">
          <h1 className="text-4xl mb-7 font-semibold text-center">
            Welcome to GameVault
          </h1>
          <p>
            Your personal vault for tracking, rating, and conquering your video
            game backlog.
          </p>
          <p>
            Tired of forgetting what games you&apos;ve finished, started, or
            never even touched? GameVault helps you organize your entire game
            collection — from "must plays" to hidden gems — with a clean,
            retro-inspired interface. Log what you're playing, track your
            progress, and relive the games you've conquered.
          </p>
          <Link href={"/sign-up"}>Join</Link>
        </div>
      </div>
      <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(250px,1fr))]">
        {gameElements}
      </div>
    </main>
  );
}
