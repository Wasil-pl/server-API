const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  concertId: { type: Number, require: true, ref: '' },
  name: { type: String, require: true },
  _id: { type: Number, require: true },
});

module.exports = mongoose.model('Workshop', workshopSchema);
