"use client";

import Image from "next/image";
//import { fetchGame } from "@/components/ProfileServerActions";

const grey_square =
  "data:image/bmp;base64,Qk0eAAAAAAAAABoAAAAMAAAAAQABAAEAGAB4eXoA";

export default function ProfileGame(user_game) {
  //const api_game = await fetchGame(user_game.game_id);
  //const game = { ...api_game, ...user_game }; // Merge the DB columns with the API columns

  return (
    <div
      key={user_game.game_id}
      className="border-1 rounded-md w-full m-4 grid grid-rows-[1fr_4fr] grid-cols-2 items-center"
    >
      <div>Title: {user_game.name}</div>
      <div>Score: {user_game.score}</div>
      <Image
        src={user_game.background_image_uri || grey_square} // default grey square if no src
        alt={"Image of " + user_game.name}
        width={150}
        height={120}
        className="p-1 m-1 border-1 rounded-sm"
      />
      <div>Review: {user_game.review}</div>
    </div>
  );
}
