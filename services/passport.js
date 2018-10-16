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
        callbackURL: '/auth/google/callback'
    },
    (accessToken,refreshToken,profile,done)=>{
        googleUser.findOne({googleId: profile.id}).then((existingUser)=>{
            if (existingUser){
                //already exist user with profile ID
                done(null,existingUser);
            }else{
                new googleUser({googleId: profile.id}).save().then(user=>{
                    done(null,user);
                });
            }
        });
    }
));

passport.use(new FacebookStrategy(
    {
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: '/auth/facebook/callback'
    },
    (accessToken, refreshToken, profile, cb)=>{
        // console.log(accessToken);
        // console.log(refreshToken);
        console.log('profile',profile);
        facebookUser.findOne({facebookId: profile.id}).then((existingUser)=>{

            if (existingUser){
                //already exist user with profile ID
                cb(null,existingUser);
            }else{
                new facebookUser({facebookId: profile.id}).save().then(user=>{
                    cb(null,user);
                });
            }
        });
    }
));
