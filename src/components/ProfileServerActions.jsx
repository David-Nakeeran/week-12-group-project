"use server";

import fetchFromAPI from "@/lib/rawgApi";

export async function fetchGame(game_id) {
  return await fetchFromAPI(`id=${game_id}`);
}
