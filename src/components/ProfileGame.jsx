"use client";

import Image from "next/image";
import { fetchGame } from "@/components/ProfileServerActions";

export default async function ProfileGame(user_game) {
  const api_game = await fetchGame(user_game.game_id);
  const game = { ...api_game, ...user_game }; // Merge the DB columns with the API columns

  console.log(user_game);
  console.log(api_game);
  console.log(game);

  return (
    <div
      key={game.game_id}
      className="border-1 rounded-md w-full m-4 grid grid-rows-[1fr_4fr] grid-cols-2 items-center"
    >
      <div>Title: {game.name}</div>
      <div>Score: {game.score}</div>
      <Image
        src={game.background_image}
        alt={"Image of " + game.name}
        style={{ height: "auto" }}
      />
      <div>Review: {game.review}</div>
    </div>
  );
}
