import { db } from "./dbConnection.js";

// Data layer usage example:
// import { dbqry, dbget [...] } from "dataLayer";
// const rows = await dbget(dbqry.getUsersByCityAndAge, ["London", 35]);
// const rows = await dbget("SELECT * FROM products");

export const dbqry = {
  getUserByName: "SELECT * FROM users WHERE username=$1",
  getUserByID: "SELECT * FROM users WHERE id=$1",
  getGameByID: "SELECT * FROM games WHERE id=$1",
  getGamesByUser:
    "SELECT * FROM users_games JOIN games ON game_id=id WHERE user_id=$1",
  getGamesByUserCat:
    "SELECT * FROM users_games JOIN games ON game_id=id WHERE user_id=$1 AND category=$2",
  getGamesByUserStatus:
    "SELECT * FROM users_games JOIN games ON game_id=id WHERE user_id=$1 AND status=$2",
  getUsersByGame:
    "SELECT users_games.*, users.username as name, users.has_avatar as avatar FROM users_games JOIN users ON users_games.user_id = users.id WHERE game_id=$1",
  createUser: "INSERT INTO users (id,username) VALUES ($1,$2)",
  addGame: "INSERT INTO games (id,name,background_image_uri) VALUES($1,$2,$3)",
  upsertGame:
    "INSERT INTO games (id,name,background_image_uri) VALUES($1,$2,$3) ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, background_image_uri=EXCLUDED.background_image_uri",
  addUserGame:
    "INSERT INTO users_games (user_id,game_id,status) VALUES($1,$2,$3)", // W/O/C/D, or null for unselected
  setAvatar: "UPDATE users SET has_avatar=$1 WHERE id=$2",
  setBio: "UPDATE users SET bio=$1 WHERE id=$2",
  setStatus: "UPDATE users_games SET status=$1 WHERE game_id=$2 AND user_id=$3", // W/O/C/D, or null for unselected
  setReviewed:
    "UPDATE users_games SET score=$1, review=$2 WHERE game_id=$3 AND user_id=$4",
  setCategory:
    "UPDATE users_games SET category=$1 WHERE game_id=$2 AND user_id=$3",
  setCompleted:
    "UPDATE users_games SET status='C', completed_at=now() WHERE game_id=$1 AND user_id=$2",
  setOnShelf:
    "UPDATE users_games SET display_on_shelf=$1 WHERE game_id=$2 AND user_id=$3",
};
// TODO: Maybe change to use PUT rather than POST for updates.
// TODO: Will need dbdel if we decide users_games records are erased when user sets to Not Selected.

// Run a SELECT query that returns a single row. Return undefined if there is no
// result. Throw an error if there is more than one result.
export async function dbgetSingle(qry, args = []) {
  const rows = await dbget(qry, args);
  if (rows?.length > 1) throw "Multiple values matched!";
  if (rows?.length === 0 || typeof rows === "undefined") return undefined;
  return rows[0];
}

// Run any SELECT query and return the matched rows.
export async function dbget(qry, args = []) {
  try {
    return Promise.resolve((await db.query(qry, args)).rows);
  } catch (er) {
    console.log(er.message);
    throw er;
  }
}

// Run any INSERT or UPDATE query.
export function dbpost(qry, args = []) {
  try {
    db.query(qry, args);
  } catch (er) {
    console.log(er.message);
    throw er;
  }
}
