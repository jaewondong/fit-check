const mongoose = require('mongoose');

const ClosetSchema = new mongoose.Schema({
    closet: [{clothingType: String, color: String}]
});

module.exports = mongoose.model("Closet", ClosetSchema);