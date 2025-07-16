import GameDescription from "@/components/GameDescription";
import ReviewFormButton from "@/components/ReviewFormButton";
import Reviews from "@/components/Reviews";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import { SignedIn } from "@clerk/nextjs";

export default async function GameDetailsPage({ params }) {
  const gameId = params.gameid;
  const apiKey = process.env.API_KEY;
  const baseUrl = process.env.API_BASE_URL;

  // For testing, Battlefield hardline Id: 3400 , GTA 5 Id: 3498

  const query = await fetch(`${baseUrl}/games/${gameId}?key=${apiKey}`);

  const game = await query.json();
  console.log(game);

  const shotQuery = await fetch(
    `${baseUrl}/games/${gameId}/screenshots?key=${apiKey}`
  );

  const screenshotList = await shotQuery.json();
  console.log(screenshotList);

  return (
    <>
      <h1>{game.name}</h1>
      <ScreenshotGallery screenshotList={screenshotList} gameName={game.name} />
      <h2>Game Overiew:</h2>
      <GameDescription html={game.description} />
      <h2>Game Details:</h2>
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
