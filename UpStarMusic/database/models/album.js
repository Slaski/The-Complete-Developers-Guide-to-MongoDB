const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  title: String,
  date: Number,
  copiesSold: Number,
  numberTracks: Number,
  image: String,
  revenue: Number
});

module.exports = AlbumSchema;
