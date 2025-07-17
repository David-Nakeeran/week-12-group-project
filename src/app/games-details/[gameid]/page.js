import AddGame from "@/components/AddGame";
import GameDescription from "@/components/GameDescription";
import ReviewForm from "@/components/ReviewForm";
import Reviews from "@/components/Reviews";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import { SignedIn } from "@clerk/nextjs";
import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import ellipsepink from "@/../public/images/bg-imgs/ellipsepink.svg";
import ellipseblue from "@/../public/images/bg-imgs/ellipseblue.svg";
import Image from "next/image";

export default async function GameDetailsPage({ params }) {
  const gameId = (await params).gameid;
  const apiKey = process.env.API_KEY;
  const baseUrl = process.env.API_BASE_URL;

  // Get the game details
  const query = await fetch(`${baseUrl}/games/${gameId}?key=${apiKey}`);
  const game = await query.json();

  const shotQuery = await fetch(
    `${baseUrl}/games/${gameId}/screenshots?key=${apiKey}`
  );
  const screenshotList = await shotQuery.json();

  const { userId } = await auth();

  // Check if the user has this game in their library
  let hasGame = false;
  let gameStatus = "W"; // defaults to wishlist

  if (userId) {
    const dbQuery = await db.query(
      `SELECT status FROM users_games WHERE user_id = $1 AND game_id = $2`,
      [userId, gameId]
    );

    if (dbQuery.rowCount > 0) {
      hasGame = true;
      gameStatus = dbQuery.rows[0].status;
    }
  }

  // This checks if the user has already made a review so the form can be prefilled and changed to edit
  let userReview = null;

  if (userId) {
    const dbquery = await db.query(
      `SELECT score, review FROM users_games WHERE user_id = $1 AND game_id = $2`,
      [userId, gameId]
    );
    if (dbquery.rowCount > 0) {
      userReview = dbquery.rows[0];
    }
  }

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
      <h1 className="flex w-full text-xl justify-between items-center mb-3">
        {game.name}
      </h1>
      <div className="bg-card-bg rounded-2xl w-full flex flex-col items-center p-5 md:p-10">
        <div>
          <ScreenshotGallery
            screenshotList={screenshotList}
            gameName={game.name}
          />
        </div>
        <SignedIn>
          <AddGame
            gameId={gameId}
            gameName={game.name}
            gameImage={game.background_image}
            hasGame={hasGame}
            gameStatus={gameStatus}
          />
        </SignedIn>
        <div>
          <h2 className="flex w-full text-xl justify-between items-center mb-3 pt-2">
            Game Overview:
          </h2>
          <GameDescription html={game.description} />
          <h2 className="flex w-full text-xl justify-between items-center mb-3 pt-2">
            Game Details:
          </h2>
          <div className="w-full flex justify-between mb-[0.5rem]">
            <p className="text-[#D5D5D5]">Release date:</p>
            <p className="text-[#fff]">{game.released}</p>
          </div>
          <div className="w-full flex justify-between mb-[0.5rem]">
            <p className="text-[#D5D5D5]">Metacritic:</p>
            <p className="text-[#fff]">{game.metacritic}</p>
          </div>
          <div className="w-full flex justify-between mb-[0.5rem]">
            <p className="text-[#D5D5D5]">Platforms:</p>
            <p className="text-[#fff] text-right">
              {game.platforms.map((p) => p.platform.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
      <h2 className="flex w-full text-xl justify-between items-center mb-3 py-3">
        Reviews
      </h2>
      <SignedIn>
        {hasGame ? (
          <ReviewForm
            gameId={gameId}
            existingReview={userReview?.review}
            existingScore={userReview?.score}
          />
        ) : (
          <p>Please add this game to your library to add a review.</p>
        )}
      </SignedIn>
      <Reviews gameId={gameId} />
    </main>
  );
}
