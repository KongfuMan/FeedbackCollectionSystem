const mongoose = require('mongoose');
const {Schema} = mongoose

const googleUserSchema = new Schema({
    googleId: String,
    credits: {type:Number, default: 0}
});

const facebookUserSchema = new Schema({
    facebookId: String,
});

mongoose.model('googleuser',googleUserSchema);
mongoose.model('facebookuser',facebookUserSchema);