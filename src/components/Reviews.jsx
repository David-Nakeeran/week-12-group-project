import { db } from "@/utils/dbConnection";

export default async function Reviews({ gameId }) {
  const query = await db.query(
    `SELECT 
    users.username,
    users_games.user_id,
    users_games.game_id,
    users_games.score,
    users_games.review
    FROM users_games
    JOIN users ON users_games.user_id = users.id
    WHERE users_games.game_id = $1
      AND users_games.score IS NOT NULL
      AND users_games.review IS NOT NULL`,
    [gameId]
  );
  const reviewData = query.rows;

  return (
    <div>
      {reviewData.map((review) => {
        return (
          <div
            key={`${review.game_id}-${review.user_id}`}
            className="flex flex-col gap-1 items-center bg-card-bg p-[1.5rem] rounded-[1.25em] justify-between h-full"
          >
            <div>
              <p className="w-full text-xl items-center mb-3 pt-2">
                {review.username}
              </p>
              <p>{review.score} Star's</p>
            </div>
            <p>{review.review}</p>
          </div>
        );
      })}
    </div>
  );
}
