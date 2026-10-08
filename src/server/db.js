//Import the better-sqlite3 library
const DataBase = require('better-sqlite3');
const db = new DataBase('dattrack-record.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS albums ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    genre TEXT,
    year INTEGER
    );
`);
