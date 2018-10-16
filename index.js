// start file
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');    //tell express to use cookies
const passport = require('passport'); ///make use of cookies
require('./models/User');
require('./services/passport'); //passport config

mongoose.connect(keys.mongoURI);
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,    //30 days
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoute')(app); //congfig the handlers

const PORT = process.env.PORT || 5000;  //process used to accept user input from terminal
app.listen(PORT);
