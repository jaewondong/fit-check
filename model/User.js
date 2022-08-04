const mongoose = require('mongoose');

const closetSchema = new mongoose.Schema({
    label: String,
    type: String,
    color: {
        r: Number,
        g: Number,
        b: Number,
    }
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    closet: [closetSchema]
             
});

module.exports = mongoose.model("User", UserSchema);