const express = require('express');
const shortid = require('shortid');
const db = require('../db');

const router = express.Router();

// GET /api/concerts
router.get('/', (req, res) => {
  res.json(db.concerts);
});

// GET /api/concerts/random
router.get('/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.concerts.length);
  const randomConcerts = db.concerts[randomIndex];
  res.json(randomConcerts);
});

// GET /api/concerts/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const concert = db.concerts.find((item) => item.id === id);

  if (!concert) return res.status(404).json({ message: 'Concert not found' });

  res.json(concert);
});

// POST /api/concerts
router.post('/', (req, res) => {
  const { day, seat, client, email } = req.body;

  const hasRequiredFields = day && seat && client && email;
  if (!hasRequiredFields) return res.status(400).json({ message: 'Missing required fields in request body' });

  const newSeat = {
    id: shortid(),
    day,
    seat,
    client,
    email,
  };

  db.seats.push(newSeat);
  res.status(201).json({ message: 'OK' });
});

// PUT /api/concerts/:id
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { performer, genre, price, day, image } = req.body;
  const concert = db.concerts.find((item) => item.id === id);

  if (!concert) return res.status(404).json({ message: 'Concert not found' });

  concert.performer = performer || concert.performer;
  concert.genre = genre || concert.genre;
  concert.price = price || concert.price;
  concert.day = day || concert.day;
  concert.image = image || concert.image;

  res.json({ message: 'OK' });
});

// DELETE /api/concerts/:id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const concertIndex = db.concerts.findIndex((item) => item.id === id);

  if (concertIndex === -1) return res.status(404).json({ message: 'Concert not found' });

  db.concerts.splice(concertIndex, 1);
  res.json({ message: 'OK' });
});

module.exports = router;
