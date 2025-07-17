import { db } from "./dbConnection.js";

async function doSeeding() {
  for (let q of [
    `BEGIN`,
    `DROP TABLE IF EXISTS users, users_games, games`,
    `CREATE TABLE users (
        id TEXT PRIMARY KEY,
        username VARCHAR(40) NOT NULL,
        bio TEXT,
        has_avatar BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        platform VARCHAR(255) NOT NULL,
        avatar_num SMALLINT
    )`,
    `CREATE TABLE games (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        background_image_uri TEXT NOT NULL
    )`,
    `CREATE TABLE users_games (
        user_id TEXT REFERENCES users (id) ON DELETE CASCADE,
        game_id INT REFERENCES games (id) ON UPDATE CASCADE,
        score SMALLINT,
        review TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        category VARCHAR(255),
        status CHAR(1) CHECK (status SIMILAR TO '[WOCD]'),
        completed_at TIMESTAMPTZ,
        display_on_shelf BOOLEAN NOT NULL DEFAULT FALSE,
        PRIMARY KEY (user_id, game_id)
    )`,
    `CREATE INDEX idx_gameid_userid ON users_games(game_id,user_id)`,
    `CREATE INDEX idx_userid_status ON users_games(user_id,status)`,
    `CREATE INDEX idx_userid_displayonshelf ON users_games(user_id,display_on_shelf)`,
    `CREATE INDEX users_username_idx ON users(username)`,
    `COMMIT`,
  ])
    await db.query(q);
  console.log("Database and any seed data created successfully!");
}
doSeeding();
