"use client";

import { useState } from "react";
import AddGameForm from "./AddGameForm";

export default function ReviewFormButton({
  gameId,
  gameName,
  gameImage,
  hasGame,
  gameStatus,
}) {
  const [showForm, setShowForm] = useState(false);

  function toggleForm() {
    setShowForm(!showForm);
  }

  return (
    <>
      <button
        onClick={toggleForm}
        className="w-full bg-[#2A2A2A] text-[#FFFFFF] font-bold pt-[0.75rem] pb-[0.75rem] pr-[1rem] pl-[1rem] text-center rounded-[0.625em] mb-[0.75rem] hover:bg-[#3a3a3a] hover:scale-105 transform transition-colors duration-200"
      >
        {hasGame ? "Edit Game Status" : "Add a Game"}
      </button>
      {showForm ? (
        <>
          <AddGameForm
            gameId={gameId}
            gameName={gameName}
            gameImage={gameImage}
            hasGame={hasGame}
            gameStatus={gameStatus}
          />
        </>
      ) : null}
    </>
  );
}
