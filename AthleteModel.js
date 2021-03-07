const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currentDate = new Date().toISOString();

const AthleteSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  sport: [
    {
      type: String,
    },
  ],
  gender: String,
  date: String,
  description: String,
  location: String,
  team: String,
  profileImage: String,
  createdAt: { type: Date, default: currentDate },
});

module.exports = mongoose.model("Athlete", AthleteSchema);
