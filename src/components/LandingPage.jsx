import Link from "next/link";
import Image from "next/image";
import fetchFromAPI from "@/lib/rawgApi";
import GameCard from "./GameCard";
import ellipsepink from "@/../public/images/bg-imgs/ellipsepink.svg";
import ellipseblue from "@/../public/images/bg-imgs/ellipseblue.svg";
import { SignedOut } from "@clerk/nextjs";

export default async function LandingPage() {
  const games = (await fetchFromAPI("metacritic=90,100&page_size=6")) || [];
  //console.log(games); // <-- do we still need this?

  const gameElements = games.map((game) => {
    return (
      <div key={game.id}>
        <GameCard game={game} />
      </div>
    );
  });

  return (
    <main className="w-full grid place-items-center px-5 md:px-16 mt-15 md:mt-20 ">
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
      <div className="w-full flex flex-col items-center sm:flex-row">
        <div className="w-full flex flex-col gap-[1.75rem] mb-[2.5rem] items-center">
          <p className="uppercase text-blue-accent font-semibold">
            Track. Rate. Conquer.
          </p>
          <h1 className="text-4xl md:text-6xl mb-7 text-center ">
            Every game. One vault.
          </h1>
          <p className="text-center md:text-lg lg:max-w-[40dvw]">
            Tired of forgetting what games you've finished, started, or never
            even touched? GameVault helps you organize your entire game
            collection. From must plays to hidden gems. Log what you're playing,
            track your progress, and relive the games you've conquered.
          </p>
          <SignedOut>
            <Link href={"/sign-up"} className="button-gradient font-bold">
              Join GameVault
            </Link>
          </SignedOut>
        </div>
      </div>

      <h2 className="w-full self-start text-xl md:text-2xl mb-3 md:mb-8">
        Top rated
      </h2>
      <div className="w-full gap-4 grid grid-rows-[1fr] md:grid-cols-2 lg:grid-cols-3 mb-4 md:mb-6">
        {gameElements}
      </div>
    </main>
  );
}
