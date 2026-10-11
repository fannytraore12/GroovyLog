//Import the better-sqlite3 library
const path = require('path');
const DataBase = require('better-sqlite3');
const dbFile = process.env.NODE_ENV === 'test'? ':memory:':path.join(__dirname,'groovylog.db');
const db = new DataBase(dbFile);

db.pragma('foreign_keys = ON')

db.exec(`
    CREATE TABLE IF NOT EXISTS albums ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cover_url TEXT,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    genre TEXT,
    year INTEGER
    );
`);


db.exec(`
    CREATE TABLE IF NOT EXISTS listens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    album_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    rating REAL CHECK(rating BETWEEN 1 AND 5),
    note TEXT,
    FOREIGN KEY (album_id) REFERENCES albums(id)
    );
`);

module.exports =db;