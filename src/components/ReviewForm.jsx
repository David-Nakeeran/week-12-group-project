"use client";
import { useState } from "react";
import { submitReview } from "../lib/actions";

export default function ReviewForm({ gameId }) {
  const [errorMessage, setErrorMessage] = useState("");

  // This handles the submit and shows an error if they have already made a review
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const result = await submitReview(formData);

    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      setErrorMessage("");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="gameId" value={gameId} />

        <label htmlFor="rating">Rate the game out of 5:</label>
        <select name="rating" required defaultValue="5">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor="review">Your review:</label>
        <input type="text" name="review" required />

        <button type="submit">Submit Review</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}
