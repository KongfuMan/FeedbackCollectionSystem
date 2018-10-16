const mongoose = require('mongoose');
const {Schema} = mongoose

const googleUserSchema = new Schema({
    googleId: String,
});

const facebookUserSchema = new Schema({
    facebookId: String,
});

mongoose.model('googleuser',googleUserSchema);
mongoose.model('facebookuser',facebookUserSchema);