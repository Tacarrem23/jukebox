import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {

}

// seed.js
const { Pool } = require('pg');
const fs = require('node:fs/promises');

const pool = new Pool({
  user: 'your_user', // Replace with your PostgreSQL user
  host: 'localhost',
  database: 'jukebox',
  password: 'your_password', // Replace with your PostgreSQL password
  port: 5432,
});

async function seedDatabase() {
  try {
    // Create tracks
    const tracks = [
      { title: 'Song 1', artist: 'Artist A' },
      { title: 'Song 2', artist: 'Artist B' },
      { title: 'Song 3', artist: 'Artist A' },
      { title: 'Song 4', artist: 'Artist C' },
      { title: 'Song 5', artist: 'Artist B' },
      { title: 'Song 6', artist: 'Artist A' },
      { title: 'Song 7', artist: 'Artist D' },
      { title: 'Song 8', artist: 'Artist C' },
      { title: 'Song 9', artist: 'Artist B' },
      { title: 'Song 10', artist: 'Artist A' },
      { title: 'Song 11', artist: 'Artist E' },
      { title: 'Song 12', artist: 'Artist C' },
      { title: 'Song 13', artist: 'Artist B' },
      { title: 'Song 14', artist: 'Artist D' },
