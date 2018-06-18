var controller = require('./controllers/index.js');
var searchBarController = require('./controllers/searchBar.js');
var createFoodController = require('./controllers/createFood.js')
var router = require('express').Router();

//from five minute react tutorial
// const User = require('../models/user.js')

//Connect controller methods to their corresponding routes
// router.get('/getAllUsers', controller.getAllUsers.get)
router.get('/getAllEntries', controller.getAllEntries.get);

router.post('/caloriesInput', controller.caloriesInput.post)

router.get('/getCalories', controller.getCalories.get);

router.get('/getTodaysJournal', controller.getTodaysJournal.get);

router.post('/userStats', controller.userStats.post);

router.post('/deleteEntry', controller.deleteEntry.post)

router.get('/getUserStats', controller.getUserStats.get);

router.post('/usdaDB', searchBarController.usdaDB.post);

router.get('/usdaReport', searchBarController.usdaReport.get);

router.get('/getYesterdayJournal', controller.getYesterdayJournal.get)

router.get('/getTomorrowJournal', controller.getTomorrowJournal.get)

router.post('/addFood', createFoodController.addFood.post);

module.exports = router;