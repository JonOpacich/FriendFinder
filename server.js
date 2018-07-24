let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let fs = require('fs');

let app = express();

var PORT = process.env.PORT || 8080;

// Expose the public directory to access html files
app.use(express.static(path.join(__dirname, './app/public')));

// middleware for parsing  post data of body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//Add the application routes
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

// Start listening on PORT
app.listen(PORT, function() {
  console.log('Friend Finder app is listening on PORT: ' + PORT);
});


