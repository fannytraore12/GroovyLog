const express = require('express');
const app = express();
app.use(express.json());

const db = require('./server/db.js');
app.get('/', (req,res) => {
    res.json({status: "ok"});
} );

app.get('/albums', (req, res) => {
    let albums;
    const genre = req.query.genre;
    if(genre != null){
        albums = db.prepare(`SELECT albums.*, ROUND(AVG(listens.rating), 2) AS avg_rating, COUNT(listens.id) AS listen_count FROM albums
            LEFT JOIN listens ON albums.id = listens.album_id
            WHERE albums.genre = ?
            GROUP BY albums.id  `).all(genre);
    }
    else{
        albums = db.prepare(`SELECT albums.*, ROUND(AVG(listens.rating), 2) AS avg_rating, COUNT(listens.id) AS listen_count FROM albums 
            LEFT JOIN listens ON albums.id = listens.album_id 
            GROUP BY albums.id`).all();
    }
    res.json(albums);

});

app.get('/albums/:id', (req, res) => {
    const id = req.params.id;
    const album = db.prepare(`SELECT albums.* ,ROUND(AVG(listens.rating), 2) AS avg_rating, 
        COUNT(listens.id) AS listen_count FROM albums
        LEFT JOIN listens ON albums.id = listens.album_id
        WHERE albums.id = ?
        GROUP BY albums.id`).get(id);
    if(album){

        res.json(album)
    }
    else{
    res.status(404).json({error:"Album not found"});
    }

});
app.post('/albums',async (req,res) =>{

        const title = req.body.title;
        const artist = req.body.artist;
        const genre = req.body.genre;
        const year = req.body.year;
        let cover_url = null;
        if(!title || !artist){
             res.status(400).json({error:"Artist and title is require :("}); 
        }
        else{
            const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artist + ' ' + title)}&entity=album&limit=1`;

            try{
                const response = await fetch(url);
                const data = await response.json();
                if(data.results[0]){
                    cover_url = data.results[0].artworkUrl100.replace('100x100', '600x600');
                }
                 }
            catch(err){console.log(err)}
            const result = db.prepare(`INSERT INTO albums (title, artist, genre, year, cover_url) VALUES (?,?,?,?,?)`).run(title, artist, genre, year, cover_url);
            const newAlbum = db.prepare(`SELECT * FROM albums WHERE id =?`).get(result.lastInsertRowid);
            res.status(201).json(newAlbum);
        }

});

app.get('/listens', (req, res) => {
    const listen = db.prepare(`SELECT listens.*, albums.title AS album_title
        FROM listens
        JOIN albums ON listens.album_id = albums.id 
        ORDER BY listens.date DESC`).all();
        res.json(listen);
});

app.post('/listens', (req,res) =>{
        const album_id = req.body.album_id;
        const date = req.body.date;
        const rating = req.body.rating;
        const note = req.body.note;
        if(!album_id || !date || !rating){
             res.status(400).json({error:"album id and date is require :("}); 
        }
        else if(1 > rating || rating >5){
            res.status(400).json({error:"Rating must be between 1 and 5!"});
        }
        else if(!db.prepare('SELECT * FROM albums WHERE id = ?').get(album_id)){
            res.status(404).json({error:"Album doesnt exixst"});
        }
        else{
            const result = db.prepare(`INSERT INTO listens (album_id, date, rating, note) VALUES (?,?,?,?)`).run(album_id, date, rating, note);
            const newListen = db.prepare(`SELECT * FROM listens WHERE id =?`).get(result.lastInsertRowid);
            res.status(201).json(newListen);
        }

});
app.get('/stats', (req, res) => {
    const monthly = db.prepare(`
    SELECT strftime('%Y-%m', listens.date) AS month, ROUND(AVG(listens.rating), 2) AS avg_rating FROM listens
    GROUP BY month
    ORDER BY month
    `).all();
    const topGenres = db.prepare(`
    SELECT albums.genre,COUNT(listens.id) AS listen_count FROM listens
    JOIN albums ON listens.album_id = albums.id 
    GROUP BY albums.genre
    ORDER BY listen_count DESC
    `).all();
    const mostReplayed = db.prepare(`
    SELECT albums.title,COUNT(listens.id) AS plays 
    FROM listens
    JOIN albums ON listens.album_id = albums.id
    GROUP BY albums.id
    ORDER BY plays DESC
    LIMIT 1
    `).get();
    const topRated = db.prepare(`
    SELECT albums.title ,ROUND(AVG(listens.rating),2) AS avg_ratings FROM listens
    JOIN albums ON listens.album_id = albums.id 
    GROUP BY albums.id
    HAVING COUNT(listens.id) >= 2
    ORDER BY avg_ratings DESC
    `).all();
    res.json({monthly,topGenres, mostReplayed, topRated});

});




module.exports = app;
