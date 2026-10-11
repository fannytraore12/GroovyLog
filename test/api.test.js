const request = require('supertest');
const app = require('../src/app');
const db = require('../src/server/db');
beforeAll(()=>{
    db.prepare('INSERT INTO albums (title, artist, genre, year) VALUES (?, ?, ?, ?)').run('Test Album', 'Test Artist', 'Pop', 2024);
    db.prepare('INSERT INTO listens (album_id, date, rating, note) VALUES (?, ?, ?, ?)').run(1, '2026-10-01', 4, 'good');
});
test('GET /return ok', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
});

test('GET /albums ok', async () => {
    const res = await request(app).get('/albums');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
});

test('GET /albums error', async () => {
    const res = await request(app).get('/albums/999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'Album not found' });
});

test('POST /albums', async () => {
    const res = await request(app).post('/albums').send({ artist: 'Someone' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error:'Artist and title is require :(' });
});

test('GET /albums/1', async () => {
    const res = await request(app).get('/albums/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Test Album');
});

test('GET /listens', async () => {
    const res = await request(app).get('/listens');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].album_title).toBe('Test Album');
    expect(res.body.length).toBe(1);
});


test('POST /listens with rating 9 return 400', async () => {
    const res = (await request(app).post('/listens').send({ album_id: 1, date: '2026-10-02', rating: 9 }));
    expect(res.statusCode).toBe(400);
});

test('POST /listens with unknow album return 404', async () => {
    const res = (await request(app).post('/listens').send({ album_id: 999, date: '2026-10-02', rating: 5 }));
    expect(res.statusCode).toBe(404);
    expect(res.body).toBeDefined();
});

test('POST /listens with valid data return 201', async () => {
    const res = (await request(app).post('/listens').send({ album_id: 1, date: '2026-10-02', rating: 5 }));
    expect(res.statusCode).toBe(201);
    expect(res.body.album_id).toEqual(1);
});