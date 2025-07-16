"use client";
import { submitGame } from "@/lib/actions";

export default function AddGameForm({
  gameId,
  gameName,
  gameImage,
  hasGame,
  gameStatus,
}) {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    submitGame(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="gameId" value={gameId} />
        <input type="hidden" name="gameName" value={gameName} />
        <input type="hidden" name="gameImage" value={gameImage} />

        <label htmlFor="status">Select your current game status:</label>
        <select name="status" required defaultValue={gameStatus || "W"}>
          <option value="W">Wishlist</option>
          <option value="O">Ongoing</option>
          <option value="C">Completed</option>
          <option value="D">Dropped</option>
        </select>

        <button type="submit">
          {hasGame ? "Update Game Status" : "Add Game"}
        </button>
      </form>
    </>
  );
}
