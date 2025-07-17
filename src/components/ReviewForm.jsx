// The reason its use client is because on earlier versions we had a buttons showing or hiding this form, and also state for an error message.

"use client";
import { submitReview } from "../lib/actions";

export default function ReviewForm({ gameId, existingReview, existingScore }) {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    submitReview(formData);
  }

  async function handleDelete() {
    const formData = new FormData();
    formData.set("gameId", gameId);
    // so for some reason null didnt work here, but "" does and then changing them to null in actions.js works
    formData.set("rating", "");
    formData.set("review", "");

    await submitReview(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-1 items-center bg-card-bg p-[1.5rem] rounded-[1.25em] justify-between h-full"
    >
      <input type="hidden" name="gameId" value={gameId} />

      <label htmlFor="rating">Rate the game out of 5:</label>
      <select
        name="rating"
        required
        defaultValue={existingScore || "5"}
        className="w-[60dvw] md:w-[5dvw] rounded-lg p-2 mt-2 border border-neutral-400"
      >
        <option value="1" className="text-neutral-900">
          1
        </option>
        <option value="2" className="text-neutral-900">
          2
        </option>
        <option value="3" className="text-neutral-900">
          3
        </option>
        <option value="4" className="text-neutral-900">
          4
        </option>
        <option value="5" className="text-neutral-900">
          5
        </option>
      </select>

      <label htmlFor="review">Your review:</label>
      <input
        type="text"
        name="review"
        required
        defaultValue={existingReview || ""}
        className="border border-neutral-400 rounded-lg bg-white text-neutral-900 font-medium px-2 py-1 w-full lg:w-auto pb-1"
      />

      <button
        type="submit"
        className="w-full bg-[#2A2A2A] text-[#FFFFFF] font-bold pt-[0.75rem] pb-[0.75rem] pr-[1rem] pl-[1rem] text-center rounded-[0.625em] mb-[0.75rem] mt-[0.75rem] hover:bg-[#3a3a3a] hover:scale-105 transform transition-colors duration-200"
      >
        {existingReview ? "Edit Review" : "Submit Review"}
      </button>

      {existingReview && (
        <button
          type="button"
          onClick={handleDelete}
          className="w-full bg-[#b40404] text-[#FFFFFF] font-bold pt-[0.75rem] pb-[0.75rem] pr-[1rem] pl-[1rem] text-center rounded-[0.625em] mb-[0.75rem] hover:bg-[#b404048e] hover:scale-105 transform transition-colors duration-200"
        >
          Delete Review
        </button>
      )}
    </form>
  );
}
