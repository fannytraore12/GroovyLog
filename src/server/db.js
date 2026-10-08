//Import the better-sqlite3 library
const DataBase = require('better-sqlite3');
const db = new DataBase('track-record.db');
db.pragma('foreign_keys =ON')

db.exec(`
    CREATE TABLE IF NOT EXISTS albums ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    genre TEXT,
    year INTEGER
    );
`);


db.exec(`
    CREATE TABLE IF NOT EXISTS playlists ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_date TEXT NOT NULL,
    mood_score INTEGER CHECK(mood_score BETWEEN 1 AND 10)
    );
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS listens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    album_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    rating INTEGER CHECK(rating BETWEEN 1 AND 5),
    note TEXT,
    FOREIGN KEY (album_id) REFERENCES albums(id)
    );
`);