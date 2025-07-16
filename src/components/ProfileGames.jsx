"use client";

import { useState } from "react";
import ProfileGame from "./ProfileGame";

export default function ProfileGames({ user_games }) {
  const [whatStatus, setWhatStatus] = useState("W");
  const filter = (games) => games.filter((g) => g.status === whatStatus);

  return (
    <>
      <div className="flex w-full justify-between md:justify-end gap-6 items-center">
        <p className="font-medium">Sort by:</p>
        <select
          value={whatStatus}
          onChange={(e) => setWhatStatus(e.target.value)}
          className="w-[60dvw] md:w-[30dvw] rounded-lg p-2 mt-2 border border-neutral-400"
        >
          <option value="W" className="text-neutral-900">
            Wishlist
          </option>
          <option value="O" className="text-neutral-900">
            Ongoing
          </option>
          <option value="C" className="text-neutral-900">
            Completed
          </option>
          <option value="D" className="text-neutral-900">
            Dropped
          </option>
        </select>
      </div>

      <div className="w-full md:gap-4 items-center grid md:grid-cols-2 mb-4">
        {filter(user_games).map((ug) => (
          <div key={ug.game_id}>
            <ProfileGame user_game={ug} />
          </div>
        ))}
      </div>
    </>
  );
}
