// start file
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');    //tell express to use cookies
const passport = require('passport'); ///make use of cookies
require('./models/User');
require('./models/Survey');
require('./services/passport'); //passport config
const bodyParser = require('body-parser');

mongoose.connect(keys.mongoURI);
const app = express();

// middleware
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,    //30 days
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session()); // passport automatically put current user into request
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require('./routes/authRoute')(app); //congfig the route handlers
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production'){
    //Express will serve up production assets
    //like our main.js and main.css file
    app.use(express.static('client/build'));

    //Express will serve up the index.html file
    //if it does not recognize the route
    const path = require('path');
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });

}

const PORT = process.env.PORT || 5000;  //process used to accept user input from terminal
app.listen(PORT);


