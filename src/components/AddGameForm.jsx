"use client";
import { submitGame } from "@/lib/actions";
import { toast } from "sonner";

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

    {
      hasGame
        ? toast("Game status updated successfully.")
        : toast("This game has been added to your library.");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="gameId" value={gameId} />
        <input type="hidden" name="gameName" value={gameName} />
        <input type="hidden" name="gameImage" value={gameImage} />

        <label htmlFor="status">Select your current game status:</label>
        <select
          name="status"
          required
          defaultValue={gameStatus || "W"}
          className=" w-full  rounded-lg p-2 mt-2 border border-neutral-400 cursor-pointer"
        >
          <option value="W" className="text-neutral-900 cursor-pointer">
            Wishlist
          </option>
          <option value="O" className="text-neutral-900 cursor-pointer">
            Ongoing
          </option>
          <option value="C" className="text-neutral-900 cursor-pointer">
            Completed
          </option>
          <option value="D" className="text-neutral-900 cursor-pointer">
            Dropped
          </option>
        </select>

        <button
          type="submit"
          className="w-full bg-[#2A2A2A] text-[#FFFFFF] font-bold pt-[0.75rem] pb-[0.75rem] pr-[1rem] pl-[1rem] text-center rounded-[0.625em] mb-[0.75rem] mt-[0.75rem] hover:bg-[#3a3a3a] hover:scale-105 transform transition-colors duration-200 cursor-pointer"
        >
          {hasGame ? "Update Game Status" : "Submit game status"}
        </button>
      </form>
    </>
  );
}
