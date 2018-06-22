const mongo = require("mongodb");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://test1:123@ds257485.mlab.com:57485/minimumviableproject",
  { useMongoClient: true }
);

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongoose connection error");
});

db.once("open", () => {
  console.log("mongoose connection for macroTrackerFoodDB success");
});

var Schema = mongoose.Schema;

const macroTrackerFoodDBSchema = mongoose.Schema({
  email: { type: String },
  Name: { type: String },
  createdAt: { type: Date },
  Water: { type: Number, default: 0 },
  Calories: { type: Number, default: 0 },
  Protein: { type: Number, default: 0 },
  Fats: { type: Number, default: 0 },
  Carbohydrate: { type: Number, default: 0 },
  Fiber: { type: Number, default: 0 },
  Sugars: { type: Number, default: 0 },
  Calcium: { type: Number, default: 0 },
  Iron: { type: Number, default: 0 },
  Magenesium: { type: Number, default: 0 },
  Phophorous: { type: Number, default: 0 },
  Potassium: { type: Number, default: 0 },
  Sodium: { type: Number, default: 0 }
});

const macroTrackerFoodDB = mongoose.model(
  "macroTrackerFoodDB",
  macroTrackerFoodDBSchema
);

var save = nutrition => {
  console.log("serverside save invoked");
  return macroTrackerFoodDB.create(nutrition, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("saved!!! BANANANANAN");
  });
};
