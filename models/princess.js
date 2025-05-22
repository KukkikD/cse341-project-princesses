const mongoose = require("mongoose");

//Mongoose Schema Validation
const princessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  movie: { type: String, required: true },
  yearReleased: { type: Number, required: true },
  kingdom: { type: String },
  mainColor: { type: String },
  animalFriend: { type: String },
  quote: { type: String },
  imageUrl: { type: String },
});

module.exports = mongoose.model("Princess", princessSchema, "princesses");
