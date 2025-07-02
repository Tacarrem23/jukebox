-- db/schema.sql
CREATE DATABASE jukebox;

\c jukebox;

CREATE TABLE tracks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255)
);

CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE playlists_tracks (
    playlist_id INTEGER REFERENCES playlists(id) ON DELETE CASCADE,
    track_id INTEGER REFERENCES tracks(id) ON DELETE CASCADE,
    PRIMARY KEY (playlist_id, track_id),
    UNIQUE (playlist_id, track_id)
);
