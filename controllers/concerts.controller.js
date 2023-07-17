const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');

const allSeats = 50;

exports.getAll = async (req, res) => {
  try {
    const seats = await Seat.find();
    const concerts = await Concert.find();

    const concertsWithSeats = concerts.map((concert) => {
      const seatsForConcert = seats.filter((seat) => seat.day === concert.day);
      return { ...concert.toObject(), seatsLeft: allSeats - seatsForConcert.length };
    });
    res.json(concertsWithSeats);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const random = Math.floor(Math.random() * count);
    const concertFromDB = await Concert.findOne().skip(random);
    if (!concertFromDB) return res.status(404).json({ message: 'Not found' });
    res.json(concertFromDB);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const concertFromDB = await Concert.findById(req.params.id);
    if (!concertFromDB) return res.status(404).json({ message: 'Not found' });
    res.json(concertFromDB);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPerformer = async (req, res) => {
  try {
    const concertFromDB = await Concert.find({ performer: req.params.performer });
    if (!concertFromDB) return res.status(404).json({ message: 'Not found' });
    res.json(concertFromDB);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const concertFromDB = await Concert.find({ genre: req.params.genre });
    if (!concertFromDB) return res.status(404).json({ message: 'Not found' });
    res.json(concertFromDB);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPrice = async (req, res) => {
  try {
    const concertFromDB = await Concert.find({ price: { $gte: req.params.price_min, $lte: req.params.price_max } });
    if (!concertFromDB) return res.status(404).json({ message: 'Not found' });
    res.json(concertFromDB);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const concertFromDB = await Concert.find({ day: req.params.day });
    if (!concertFromDB) return res.status(404).json({ message: 'Not found' });
    res.json(concertFromDB);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addNew = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.status(201).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const concertFromDB = await Concert.findById(req.params.id);
    if (!concertFromDB) return res.status(404).json({ message: 'Not found...' });

    concertFromDB.performer = performer;
    concertFromDB.genre = genre;
    concertFromDB.price = price;
    concertFromDB.day = day;
    concertFromDB.image = image;
    await concertFromDB.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const concertFromDB = await Concert.findByIdAndDelete(req.params.id);
    if (!concertFromDB) return res.status(404).json({ message: 'Not found...' });

    res.json({ message: 'OK', deletedDocument: concertFromDB });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
