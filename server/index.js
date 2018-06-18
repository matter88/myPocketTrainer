var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var bodyParser = require('body-parser')

//router
var router = require('./routes.js');


//initialize App
var app = express();

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//bodyparser middleware
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(cookieParser());



//set static folder
app.use(express.static(__dirname + '/../react-client/dist'));

// app.use('/', index);
// app.use('/api', api);
app.use('/banx', router)
// app.use(router)



app.set('port', (process.env.PORT || 8080))


// app.post('/dropDB', function(req, res) {
//   items.removeDatabase
// })


app.listen(app.get('port'), function() {
  console.log('Server started on port ' + app.get('port'));
});

// process.env.PORT