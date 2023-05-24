const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const db = require('../db');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// GET /api/testimonials
router.get('/', (req, res) => {
  res.json(db.testimonials);
});

// GET /api/testimonials/random
router.get('/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  const randomTestimonial = db.testimonials[randomIndex];
  res.json(randomTestimonial);
});

// GET /api/testimonials/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const testimonial = db.testimonials.find((item) => item.id === id);

  if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

  res.json(testimonial);
});

// POST /api/testimonials
router.post('/', (req, res) => {
  const { author, text } = req.body;

  const hasAuthorAndText = author && text;
  if (!hasAuthorAndText) return res.status(400).json({ message: 'Missing author or text in request body' });

  const newTestimonial = {
    id: shortid(),
    author,
    text,
  };

  db.testimonials.push(newTestimonial);
  res.status(201).json({ message: 'OK' });
});

// PUT /api/testimonials/:id
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { author, text } = req.body;
  const testimonial = db.testimonials.find((item) => item.id === id);

  if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

  testimonial.author = author || testimonial.author;
  testimonial.text = text || testimonial.text;

  res.json({ message: 'OK' });
});

// DELETE /api/testimonials/:id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const testimonialIndex = db.testimonials.findIndex((item) => item.id === id);

  if (testimonialIndex === -1) return res.status(404).json({ message: 'Testimonial not found' });

  db.testimonials.splice(testimonialIndex, 1);
  res.json({ message: 'OK' });
});

module.exports = router;
