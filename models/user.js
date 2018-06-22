var mongo = require("mongodb");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://test1:123@ds257485.mlab.com:57485/minimumviableproject",
  { useMongoClient: true }
);
// mongoose.connect('mongodb://localhost/loginapp')
var db = mongoose.connection;

db.on("error", function() {
  console.log("mongoose connection error");
});

db.once("open", function() {
  console.log("mongoose nutrients connected successfully");
});

var Schema = mongoose.Schema;
// const schema = mongoose.Schema;

const userNutritionIntakeSchema = mongoose.Schema({
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

const userNutritionIntake = mongoose.model(
  "userNutritionIntake",
  userNutritionIntakeSchema
);

var selectAll = () => {
  return userNutritionIntake.find({}, function(err, entry) {
    if (err) {
      console.log(err);
    } else {
      console.log("success!");
    }
  });
};

var save = nutrition => {
  console.log("serverside save invoked");
  return userNutritionIntake.create(nutrition, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("saved!!! BANANANANAN");
  });
};

var todaysJournal = () => {
  console.log("todays data invoked");
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  return userNutritionIntake.find({ createdAt: { $gte: today } }, function(
    err,
    entry
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log("success pulled back todays journal!");
    }
  });
};

const yesterdayJournal = () => {
  console.log("yesterday data invoked");
  let date = new Date();
  date.setDate(date.getDate() - 1);
  date.setHours(0, 0, 0, 0);
  return userNutritionIntake.find({ createdAt: { $gte: date } }, function(
    err,
    entry
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log("success pulled back yesterdays journal!");
    }
  });
};

const tomorrowJournal = () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);
  return userNutritionIntake.find({ createdAt: { $gte: date } }, function(
    err,
    entry
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log("success pulled back tomorrows journal!");
    }
  });
};

const deleteEntry = objId => {
  console.log("delete entry in model invoked");
  return userNutritionIntake.remove({ _id: objId }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("successfully deleted");
    }
  });
};

exports.save = save;
exports.selectAll = selectAll;
exports.todaysJournal = todaysJournal;
exports.deleteEntry = deleteEntry;
exports.yesterdayJournal = yesterdayJournal;
exports.tomorrowJournal = tomorrowJournal;
