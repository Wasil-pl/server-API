const express = require('express');
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

mongoose.connect(
  'mongodb+srv://Wasil:EWHveTWdVRNpDpNh@cluster0.lvwrcbb.mongodb.net/music_festival?retryWrites=true&w=majority',
  {
    useNewUrlParser: false,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const server = app.listen(process.env.PORT || 8000, () => console.log('Server is running on port: 8000'));
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket! – ' + socket.id);
});

app.use((req, res) => res.status(404).json({ message: '404 not found...' }));

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));
