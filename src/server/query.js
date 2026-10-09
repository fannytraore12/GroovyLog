const db = require('./db');
const stats = db.prepare(`
  SELECT albums.title,
         COUNT(listens.id) AS listen_count,
         AVG(listens.rating) AS avg_rating
  FROM albums
  LEFT JOIN listens ON listens.album_id = albums.id
  GROUP BY albums.id ORDER BY listen_count DESC
`).all();
console.log(stats);