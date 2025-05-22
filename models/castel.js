const mongoose = require("mongoose");

const castleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: String,
  builtYear: Number,
  isMagical: Boolean,
  princessResident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Princess" // connect with princess
  },
  size: String,
  guardCount: Number
});

module.exports = mongoose.model("Castle", castleSchema);