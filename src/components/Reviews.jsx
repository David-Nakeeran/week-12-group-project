import { db } from "@/utils/dbConnection";
import { StarIcon } from "lucide-react";

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
    <div className="w-full h-fit justify-center items-center  md:max-w-full">
      {reviewData.map((review) => {
        return (
          <div
            key={`${review.game_id}-${review.user_id}`}
            className="bg-card-bg rounded-2xl p-[1.5rem] mb-4"
          >
            <div className="flex justify-between pb-4">
              <p className="text-xl">{review.username}</p>
              <p className="flex gap-2 items-center">
                {review.score} <StarIcon fill="#E9CF81" strokeWidth={0} />
              </p>
            </div>
            <p>{review.review}</p>
          </div>
        );
      })}
    </div>
  );
}
