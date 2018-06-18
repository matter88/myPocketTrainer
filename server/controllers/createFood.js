var db = require('../../models/macroTrackerFoodDB');

module.exports = {
    addFood: {
        post: function(req, res) {
          var userBodyStats = req.body
          db.save(userBodyStats)
          .then((results) => {
            res.send('saved!')
          })
          .catch((error) => console.log(error))
        }  
      }, 
}