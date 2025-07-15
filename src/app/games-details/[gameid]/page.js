import GameDescription from "@/components/GameDescription";
import ReviewFormButton from "@/components/ReviewFormButton";
import Reviews from "@/components/Reviews";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";

export default async function GameDetailsPage({ params }) {
  const gameId = params.gameid;
  const apiKey = process.env.API_KEY;
  const baseUrl = process.env.API_BASE_URL;

  // For testing, Battlefield hardline Id: 3400 , GTA 5 Id: 3498

  const query = await fetch(`${baseUrl}/games/${gameId}?key=${apiKey}`);

  const game = await query.json();
  console.log(game);

  return (
    <>
      <h1>{game.name}</h1>
      <Image
        src={game.background_image}
        alt="placeholder"
        width={400}
        height={400}
      />
      {/* <Image src="#" alt="placeholder" />
      <Image src="#" alt="placeholder" />
      <Image src="#" alt="placeholder" /> */}
      <GameDescription html={game.description} />
      <div>
        <div>
          <p>Release date:</p>
          <p>{game.released}</p>
        </div>
        <div>
          <p>Metacritic:</p>
          <p>{game.metacritic}</p>
        </div>
        <div>
          <p>Platforms:</p>
          <p>{game.platforms.map((p) => p.platform.name).join(", ")}</p>
        </div>
      </div>
      <h2>Reviews</h2>
      <SignedIn>
        <ReviewFormButton gameId={gameId} />
      </SignedIn>
      <Reviews gameId={gameId} />
    </>
  );
}
