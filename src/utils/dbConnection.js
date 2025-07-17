import pg from "pg";

export const db = new pg.Pool({
  connectionString: process.env.NEXT_DATABASE_URL,
});
