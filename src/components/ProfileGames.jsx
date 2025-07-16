"use client";

import { useState } from "react";
import ProfileGame from "./ProfileGame";

export default function ProfileGames({ user_games }) {
  const [whatStatus, setWhatStatus] = useState("W");
  const filter = (games) => games.filter((g) => g.status === whatStatus);

  return (
    <>
      <select
        value={whatStatus}
        onChange={(e) => setWhatStatus(e.target.value)}
      >
        <option value="W">Wishlist</option>
        <option value="O">Ongoing</option>
        <option value="C">Completed</option>
        <option value="D">Dropped</option>
      </select>
      <div className="w-full flex flex-col gap-1 items-center">
        {filter(user_games).map((ug) => (
          <div key={ug.game_id}>
            <ProfileGame user_game={ug} />
          </div>
        ))}
      </div>
    </>
  );
}
