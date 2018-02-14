const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://test1:123@ds257485.mlab.com:57485/minimumviableproject', {useMongoClient:true});

var db = mongoose.connection;

db.on('error', () => {
    console.log('mongoose userBodyStats connection error');
})

db.once('open', () => {
    console.log('mongoose userBodystats connection succcessful');
})

var Schema = mongoose.Schema

const userBodyStatsSchema = mongoose.Schema({
    email: { type: String },
    createdAt: { type: Date },
    activityLevel: { type: String },
    age: { type: Number },   
    email: { type: String },
    gender: { type: String },
    goal: { type: String },
    height: { type: Number},
    weight: { type: Number},
    calories: { type: Number},
    protien: { type: Number },
    carbohydrates: { type: Number },
    fats: { type: Number }
})

const userBodyStats = mongoose.model('userBodyStats', userBodyStatsSchema)

const save = (userStatsInput) => {
  return userBodyStats.create(userStatsInput, function(err) {
    if (err) {console.log(err)}
    console.log('saved from userBodyStats.js')
  })
}

const find = (email) => {
    return userBodyStats
    .find()
    .where('email', email)
    .exec(function(err) {
        if (err) {console.log(err)}
        console.log('find age 33 from userBodyStats.js')
      })
}

const getUserStats = (email) => {
    console.log('get user stats invoked', email)
    let today = new Date();
    today.setHours(0,0,0,0);
    
    return userBodyStats
    .find()
    .where('email', email)
    .sort({"createdAt": -1})
    .limit(1)
    .exec(function(err, data) {
        if (err) {console.log('getUSefsfs',err)}
        console.log('BANANAPANCAKES', data)
      })
}



exports.save = save;
exports.find = find;
exports.getUserStats = getUserStats;
