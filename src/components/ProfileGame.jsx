"use client";

import Image from "next/image";
import Link from "next/link";
//import { fetchGame } from "@/components/ProfileServerActions";
import { StarIcon } from "lucide-react";

const grey_square =
  "data:image/bmp;base64,Qk0eAAAAAAAAABoAAAAMAAAAAQABAAEAGAB4eXoA";

export default function ProfileGame({ user_game }) {
  //const api_game = await fetchGame(user_game.game_id);
  //const game = { ...api_game, ...user_game }; // Merge the DB columns with the API columns

  return (
    <Link
      href={`games-details/${user_game.game_id}`}
      key={user_game.game_id}
      className="bg-card-bg p-4 rounded-2xl w-full grid grid-rows-[1fr] grid-cols-2 gap-4 md:gap-6 items-center mb-3 hover:bg-button-hover"
    >
      <Image
        src={user_game.background_image_uri || grey_square} // default grey square if no src
        alt={"Image of " + user_game.name}
        width={150}
        height={150}
        className="object-cover w-full h-[20dvh] lg:h-[30dvh] p-1 m-1 border-1 rounded-sm"
      />
      <div>
        <p className="text-sm md:text-lg pb-2">
          {user_game.score ? (
            <>
              <span className="flex items-center gap-2">
                {user_game.score}
                <StarIcon fill="#E9CF81" stroke="#E9CF81" className="w-4 h-4" />
              </span>
            </>
          ) : (
            "N/A"
          )}
        </p>
        <h2 className="pb-3  md:text-xl"> {user_game.name}</h2>
        <p className="text-sm  md:text-lg">
          <strong>Review: </strong> {user_game.review || "Not reviewed yet."}
        </p>
      </div>
    </Link>
  );
}
