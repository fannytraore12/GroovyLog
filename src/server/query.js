const db = require('./db');
const stats = db.prepare(`
  SELECT strftime('%Y-%m', listens.date)  AS month, ROUND(AVG(listens.rating), 2) AS avg_rating FROM listens
  GROUP BY month
  ORDER BY month 
`).all();
console.log(stats);