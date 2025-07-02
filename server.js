import app from "#app";
import db from "#db/client";

const PORT = process.env.PORT ?? 3000;

await db.connect();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

// server.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
const pool = new Pool({ database: 'jukebox' });

app.use(express.json());

/**
 * /tracks Router
 */
app.get('/tracks', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM tracks');
  res.json(rows);
});

app.get('/tracks/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM tracks WHERE id = $1', [id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Track not found' });
  res.json(rows[0]);
});

/**
 * /playlists Router
 */
app.get('/playlists', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM playlists');
  res.json(rows);
});

app.post('/playlists', async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).json({ error: 'Name and description required' });

  const { rows } = await pool.query(
    'INSERT INTO playlists (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  res.status(201).json(rows[0]);
});

app.get('/playlists/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM playlists WHERE id = $1', [id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Playlist not found' });
  res.json(rows[0]);
});

app.get('/playlists/:id/tracks', async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `
    SELECT t.* FROM tracks t
    JOIN playlists_tracks pt ON pt.track_id = t.id
    WHERE pt.playlist_id = $1
    `,
    [id]
  );
  res.json(rows);
});

app.post('/playlists/:id/tracks', async (req, res) => {
  const { id } = req.params;
  const { trackId } = req.body;

  if (!trackId) return res.status(400).json({ error: 'trackId is required' });

  try {
    const { rows } = await pool.query(
      `INSERT INTO playlists_tracks (playlist_id, track_id)
       VALUES ($1, $2)
       RETURNING *`,
      [id, trackId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      res.status(409).json({ error: 'Track already in playlist' });
    } else {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
