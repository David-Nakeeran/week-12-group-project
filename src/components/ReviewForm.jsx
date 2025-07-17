// The reason its use client is because on earlier versions we had a buttons showing or hiding this form, and also state for an error message.

"use client";
import { submitReview } from "../lib/actions";
import { toast } from "sonner";

export default function ReviewForm({ gameId, existingReview, existingScore }) {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    submitReview(formData);
    toast("Your review has been submited.");
  }

  async function handleDelete() {
    const formData = new FormData();
    formData.set("gameId", gameId);
    // so for some reason null didnt work here, but "" does and then changing them to null in actions.js works
    formData.set("rating", "");
    formData.set("review", "");

    await submitReview(formData);
    toast("Your review has been deleted.");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="gameId" value={gameId} />

      <label htmlFor="rating">Rate the game out of 5:</label>
      <select name="rating" required defaultValue={existingScore || "5"}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <label htmlFor="review">Your review:</label>
      <input
        type="text"
        name="review"
        required
        defaultValue={existingReview || ""}
      />

      <button type="submit">
        {existingReview ? "Edit Review" : "Submit Review"}
      </button>

      {existingReview && (
        <button type="button" onClick={handleDelete}>
          Delete Review
        </button>
      )}
    </form>
  );
}
