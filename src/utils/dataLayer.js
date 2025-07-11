import { db } from "./dbConnection.js";

// Data layer usage example:
// import { dbqry, dbget [...] } from "dataLayer";
// const rows = dbget(dbqry.getUsersByCityAndAge(["London", 35]));
// const rows = dbget("SELECT * FROM products");

export const dbqry = {
  getUserByName: "SELECT * FROM users WHERE username=$1",
  getUserByID: "SELECT * FROM users WHERE id=$1",
  getGamesByUser: "SELECT * FROM users_games WHERE user_id=$1",
  addGame: "INSERT INTO users_games (user_id,game_id,status) VALUES($1,$2,$3)",
  setStatus: "UPDATE users_games SET status=$1 WHERE game_id=$2",
  setAvatar: "UPDATE users SET has_avatar=$1 WHERE id=$2",
};
// TODO: Maybe change to use PUT rather than POST for updates

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
