const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Athlete = require("./AthleteModel");

require("dotenv").config();

const port = process.env.PORT || 4000;

// Cross-Origin Requests
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.PRODUCTION_CLIENT_URL
        : "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.post("/api/create", (req, res) => {
  const newAthlete = new Athlete({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });

  newAthlete.save((err) => {
    if (err) {
      console.log(err);
    }

    res.send("Athlete saved!");
  });
});

app.get("/api/read", (req, res) => {
  Athlete.find({}, (err, athletes) => {
    if (err) {
      console.log(err);
    }
    res.send(athletes);
  });
});

app.put("/api/update", (req, res) => {
  const id = req.body._id;

  const updatedAthleteObj = req.body;

  Athlete.findByIdAndUpdate(
    id,
    updatedAthleteObj,
    { new: true },
    (err, athlete) => {
      if (err) {
        console.log(err);
      }

      res.send(athlete);
    }
  );
});

// Connect to MongoDB with Mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.iopap.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
