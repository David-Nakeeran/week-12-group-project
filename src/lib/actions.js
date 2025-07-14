"use server";

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
