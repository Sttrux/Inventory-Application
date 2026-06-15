const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS song_genre;
DROP TABLE IF EXISTS artist_song;
DROP TABLE IF EXISTS genre;
DROP TABLE IF EXISTS artist;
DROP TABLE IF EXISTS song;

CREATE TABLE song (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT,
    cover_url TEXT
);

CREATE TABLE artist (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT
);

CREATE TABLE artist_song (
    song_id INTEGER NOT NULL REFERENCES song(id) ON DELETE CASCADE,
    artist_id INTEGER NOT NULL REFERENCES artist(id) ON DELETE CASCADE,
    PRIMARY KEY (song_id, artist_id)
);

CREATE TABLE genre (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    genre_name TEXT
);

CREATE TABLE song_genre (
    song_id INTEGER NOT NULL REFERENCES song(id) ON DELETE CASCADE,
    genre_id INTEGER NOT NULL REFERENCES genre(id) ON DELETE CASCADE,
    PRIMARY KEY (song_id, genre_id)
);

INSERT INTO song (title, cover_url) VALUES
('Numb', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d'),
('Lose Yourself', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4'),
('Hello', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'),
('Fix You', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81'),
('One More Time', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f'),
('Shake It Off', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819'),
('Blinding Lights', 'https://images.unsplash.com/photo-1489641493513-ba4ee84ccea9'),
('Believer', 'https://images.unsplash.com/photo-1518972559570-7cc1309f3229'),
('Enter Sandman', 'https://images.unsplash.com/photo-1464375117522-1311dd4d3a7f'),
('Bad Guy', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea');

INSERT INTO artist (name) VALUES
('Linkin Park'),
('Eminem'),
('Adele'),
('Coldplay'),
('Daft Punk'),
('Taylor Swift'),
('The Weeknd'),
('Imagine Dragons'),
('Metallica'),
('Billie Eilish');

INSERT INTO genre (genre_name) VALUES
('Rock'),
('Hip Hop'),
('Pop'),
('Electronic'),
('Alternative'),
('Metal'),
('R&B'),
('Indie'),
('Rap'),
('Dance');

INSERT INTO artist_song (song_id, artist_id) VALUES
(1,1),(2,2),(3,3),(4,4),(5,5),
(6,6),(7,7),(8,8),(9,9),(10,10);

INSERT INTO song_genre (song_id, genre_id) VALUES
(1,5),(2,9),(3,3),(4,1),(5,4),
(6,3),(7,7),(8,5),(9,6),(10,3);
`;

async function main() {
  const client = new Client({
    connectionString: "postgresql://USER:PASSWORD@HOST:5432/DB",
  });
  const client = new Client({
    connectionString: "postgresql://USER:PASSWORD@HOST:5432/DB",
  });

  // Connection string breakdown:
  // USER     → your PostgreSQL username (e.g. postgres or Render user like top_users_agpp_user)
  // PASSWORD → password for that database user
  // HOST     → database host (localhost for local dev, or Render external host like dpg-xxx.render.com)
  // PORT     → PostgreSQL port (default is 5432)
  // DB       → name of the database (e.g. top_users, message_app, etc)
  await client.connect();
  console.log("Seeding...");
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

main();
