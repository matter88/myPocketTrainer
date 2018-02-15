var db = require('../../models/userBodyStats.js');
var db2 = require('../../models/user.js')
var axios = require('axios');


module.exports = {
    userStats: {
      post: function(req, res) {
        var userBodyStats = req.body
        db.save(userBodyStats)
        .then((results) => {
          res.send('saved!')
        })
        .catch((error) => console.log(error))
      }  
    },

    getUserStats: {
      get: function(req, res) {
        db.getUserStats(req.query.email)
        .then((results) => {
          res.send(results)
        })
        .catch((error) => console.log(error))
      }  
    },

    getTodaysJournal: {
      get: function(req, res) {
        db2.todaysJournal(new Date())
        .then((results) => {
          res.send(results)
        })
        .catch((error) => console.log(error))
      }
    },

    getAllEntries: {
        get: function(req, res) {
            db2.selectAll()
            .then((results) => {
                res.send(results)
            })
            .catch((error) => console.log(error))
          }
      },

      getAllUsers: {
        get: function(req, res) {
          User.selectAllUsers()
          .then((results) => {
            res.send(results)
          })
          .catch((error) => console.log(error))
        }
      },

      caloriesInput: {
        post: function(req, res) {
            var itemCalories = req.body
            db2.save(itemCalories)
            .then((results) => {
              res.send('saved!')
            })
            .catch((error) => console.log(error))
          } 
      },

      getCalories: {
          get: function(req, res) {
            let count = 2000
            db.selectAll()
            .then((results) => {
              results.forEach((entry) => {
                count -= entry.calories
              })
              res.send({caloriesLeft: Math.floor(count)})
            })
            .catch((error) => console.log(error))
          }
      },

      userStats: {
        post: function(req, res) {
          var userBodyStats = req.body
          db.save(userBodyStats)
          .then((results) => {
            res.send('saved oranges!')
          })
          .catch((error) => console.log(error))
        }
      }


}