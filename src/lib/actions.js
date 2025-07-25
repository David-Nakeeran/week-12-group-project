"use server";

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

// Our db queries that require form actions

//create profile
export async function CreateUserProfile(id, formData) {
  console.log("Saving user to the database...");

  const profileData = {
    username: formData.get("username"),
    bio: formData.get("bio"),
    platform: formData.get("platform"),
  };
  await db.query(
    `INSERT INTO users (id, username, bio, platform) VALUES ($1, $2, $3, $4)`,
    [id, profileData.username, profileData.bio, profileData.platform]
  );
  revalidatePath(`/`);
  redirect("/profile");
}

// Submit game review
export async function submitReview(formData) {
  const { userId } = await auth();

  const gameId = formData.get("gameId");
  let rating = formData.get("rating");
  let review = formData.get("review");

  // have to change them to null, the small int doesnt like the """

  if (rating === "") rating = null;
  if (review === "") review = null;

  await db.query(
    `UPDATE users_games
     SET score = $1,
         review = $2
     WHERE game_id = $3
       AND user_id = $4`,
    [rating, review, gameId, userId]
  );

  revalidatePath(`/game-details/${gameId}`);
}

// Add game to library
export async function submitGame(formData) {
  const { userId } = await auth();

  const gameId = formData.get("gameId");
  const gameName = formData.get("gameName");
  const gameImage = formData.get("gameImage");
  const status = formData.get("status");

  // First insert game into our own db if not exists
  await db.query(
    `INSERT INTO games (id, name, background_image_uri)
     VALUES ($1, $2, $3)
     ON CONFLICT (id) DO NOTHING`,
    [gameId, gameName, gameImage]
  );

  // Then insert or update users_games
  await db.query(
    `INSERT INTO users_games (user_id, game_id, status)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, game_id) DO UPDATE
     SET status = EXCLUDED.status`,
    [userId, gameId, status]
  );
  revalidatePath(`/game-details/${gameId}`);
}
