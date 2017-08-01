var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use({secret: process.env.SESSION_SECRET});

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


app.use(passport.initialize());
app.use(passport.session());

require("./assignment/app.js")(app);


var port = process.env.PORT || 3000;

app.listen(port);