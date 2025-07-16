import AddGame from "@/components/AddGame";
import GameDescription from "@/components/GameDescription";
import ReviewForm from "@/components/ReviewForm";
import Reviews from "@/components/Reviews";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import { SignedIn } from "@clerk/nextjs";
import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";

export default async function GameDetailsPage({ params }) {
  const gameId = params.gameid;
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
    <main>
      <div>
        <div>
          <div>
            <h1>{game.name}</h1>
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
            <h2>Game Overview:</h2>
            <GameDescription html={game.description} />
            <h2>Game Details:</h2>
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
        </div>
        <h2>Reviews</h2>
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
      </div>
    </main>
  );
}
