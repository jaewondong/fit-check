const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    closet: [
        {clothingType: String,
        color: String}
    ]
})

module.exports = mongoose.model("User", UserSchema);