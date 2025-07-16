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
      <button onClick={toggleForm}>
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
