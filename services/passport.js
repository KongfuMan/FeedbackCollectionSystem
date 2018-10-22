const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const googleUser = mongoose.model('googleuser');// fetch user collection from DB and
const facebookUser = mongoose.model('facebookuser');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    googleUser.findById(id).then(user=>{
        done(null,user);
    })
});

passport.use(new GoogleStrategy(
    {
        clientID: keys.googleCilentID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    async (accessToken,refreshToken,profile,done)=>{
        const existingUser = await googleUser.findOne({googleId: profile.id})
        if (existingUser){
            //already exist user with profile ID
            return done(null,existingUser);
        }
        const user = await new googleUser({googleId: profile.id}).save();
        done(null,user);
    }
));

passport.use(new FacebookStrategy(
    {
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: '/auth/facebook/callback',
        proxy: true // https
    },
    async (accessToken, refreshToken, profile, cb)=>{
        console.log('profile',profile);
        const existingUser = await facebookUser.findOne({facebookId: profile.id});
        if (existingUser){
            //already exist user with profile ID
            return cb(null,existingUser);
        }
        const user = await new facebookUser({facebookId: profile.id}).save();
        cb(null,user);
    }
));
