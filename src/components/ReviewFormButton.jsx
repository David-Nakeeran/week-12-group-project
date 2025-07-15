"use client";
import ReviewForm from "./ReviewForm";
import { useState } from "react";

export default function ReviewFormButton({ gameId }) {
  const [showForm, setShowForm] = useState(false);

  function toggleForm() {
    setShowForm(!showForm);
  }

  return (
    <>
      <button onClick={() => toggleForm()}>Add a Review</button>
      {showForm ? (
        <>
          <ReviewForm gameId={gameId} />
        </>
      ) : null}
    </>
  );
}
