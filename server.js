const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

const routes = require('./routes/index');
const app = express();

const port = process.env.PORT || 4000;

dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/', routes);
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(express.static('public')); //?

// If in production, then use static frontend build files.
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));

    // Handle React routing, return all requests to React app.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}



/** 
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
*/

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected")).catch((e) => console.error(e));

app.listen(port, () => console.log(`Listening on port ${port}`));
