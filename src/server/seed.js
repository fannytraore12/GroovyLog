const db = require('./db');
db.exec(`
        INSERT INTO albums (title, artist, genre, year)
        VALUES ('I''ll Like You', 'ILLIT', 'K-Pop', 2025);

        INSERT INTO albums (title, artist, genre, year)
        VALUES ('Sour', 'Olivia Rodrigo', 'Pop', 2022);

        INSERT INTO albums (title, artist, genre, year)
        VALUES ('Eternal Sunshine', 'Ariana Grande', 'R&B', 2024);

        INSERT INTO listens (album_id, date, rating, note)
        VALUES (1, '2026-10-08', 4.25, 'This album feels me with so much dread it sounds almost creepy...');

        INSERT INTO listens (album_id, date, rating, note)
        VALUES (3, '2026-10-08', 3.9, 'I havent finished listening to it, but so far it has been greeeaat!');

        INSERT INTO listens (album_id, date, rating, note)
        VALUES (3, '2026-10-08', 5, 'I left my house at a pub in Hamstead!!!');
`);
