const express = require('express');
const shortid = require('shortid');
const db = require('../db');

const router = express.Router();

// GET /api/seats
router.get('/', (req, res) => {
  res.json(db.seats);
});

// GET /api/seats/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const seat = db.seats.find((item) => item.id === id);

  if (!seat) return res.status(404).json({ message: 'Seat not found' });

  res.json(seat);
});

// POST /api/seats
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

// PUT /api/seats/:id
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { day, seat, client, email } = req.body;
  const selectedSeat = db.seats.find((item) => item.id === id);

  if (!selectedSeat) return res.status(404).json({ message: 'Seat not found' });

  selectedSeat.day = day || selectedSeat.day;
  selectedSeat.seat = seat || selectedSeat.seat;
  selectedSeat.client = client || selectedSeat.client;
  selectedSeat.email = email || selectedSeat.email;

  res.json({ message: 'OK' });
});

// DELETE /api/seats/:id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const seatIndex = db.seats.findIndex((item) => item.id === id);

  if (seatIndex === -1) return res.status(404).json({ message: 'Seat not found' });

  db.seats.splice(seatIndex, 1);
  res.json({ message: 'OK' });
});

module.exports = router;
