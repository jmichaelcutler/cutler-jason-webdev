var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

require("./assignment/app.js")(app);
require("./project/app.js");


var port = process.env.PORT || 3000;

app.listen(port);