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

//Submit game review
export async function submitReview(formData) {
  const { userId } = await auth();

  const gameId = formData.get("gameId");
  const rating = formData.get("rating");
  const review = formData.get("review");

  await db.query(
    `INSERT INTO users_games (user_id, game_id, score, review)
     VALUES ($1, $2, $3, $4)`,
    [userId, gameId, rating, review]
  );

  revalidatePath(`/game-details/${gameId}`);
}
