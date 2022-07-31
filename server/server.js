const mongoose = require('mongoose');
const express = require('express');
const User = require('./model/User');

const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

run();
async function run() {
    try {
            const user1 = await User.create({
                username: "user1",
                password: "password1",
                closet: [
                    {clothingType: "shorts", color: "green"},
                    {clothingType: "hoodie", color: "black"}
                ]
            })
            //await user1.save();
            console.log(user1);
        }
        catch (e) {
            console.log(e.message);
        }
}

mongoose.connect(process.env.DB, {
    useNewUrlParser: true
}).then(() => console.log("MongoDB Connected")).catch((e) => console.error(e));

app.listen(port, () => console.log(`Listening on port ${port}`));
