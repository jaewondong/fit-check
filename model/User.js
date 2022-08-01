const mongoose = require('mongoose');

const closetSchema = new mongoose.Schema({
    clothingType: String,
    color: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    closet: [closetSchema]
             
});

module.exports = mongoose.model("User", UserSchema);