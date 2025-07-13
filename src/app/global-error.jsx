"use client";
import Link from "next/link";
import { useEffect } from "react";

// Error page runs in the client
export default function GlobalErrorPage({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html>
      <body className="bg-[#1e1e2f] text-[#d1fae5] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-red-400 mb-4">
          Something went wrong!
        </h1>
        <p className="text-[#fca5a5] mb-6">{error.message}</p>
        <Link
          href={"/"}
          className="p-4 rounded-md bg-[#22c55e] text-[#1e1e2f] font-semibold hover:bg-green-400 transition-colors text-center"
        >
          Go to homepage
        </Link>
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded-md bg-[#ef4444] text-white font-semibold hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
