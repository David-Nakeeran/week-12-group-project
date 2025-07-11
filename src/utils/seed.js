import { db } from "./dbConnection.js";

async function doSeeding() {
  for (let q of [
    `BEGIN`,
    `DROP TABLE IF EXISTS users, users_games`,
    `CREATE TABLE users (
        id TEXT PRIMARY KEY,
        username VARCHAR(40) NOT NULL,
        bio TEXT,
        has_avatar BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`,
    `CREATE TABLE users_games (
        user_id TEXT REFERENCES users (id) ON DELETE CASCADE,
        game_id INT,
        score SMALLINT,
        review TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        category VARCHAR(255),
        status CHAR(1) CHECK (status SIMILAR TO '[WPCD]'),
        completed_at TIMESTAMPTZ,
        display_on_shelf BOOLEAN NOT NULL DEFAULT FALSE,
        PRIMARY KEY (user_id, game_id)
    )`,
    `CREATE INDEX idx_gameid_userid ON users_games(game_id,user_id)`,
    `CREATE INDEX idx_userid_status ON users_games(user_id,status)`,
    `CREATE INDEX idx_userid_displayonshelf ON users_games(user_id,display_on_shelf)`,
    `COMMIT`,
  ])
    await db.query(q);
  console.log("Seed data created successfully!");
}
doSeeding();
