
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Closet = require('./Closet');
const bcrypt = require('bcrypt')


router.get('/', (req, res) => {
    res.send('hello');
})

router.get('/login',  (req, res) => {
    res.header("Content-Type", 'application/json')
    res.send(JSON.stringify(req.body));
})


router.post('/login', async (req, res) => {
    let closet = new Closet();
    const user = await closet.getClosetData(req.body.username);
    res.header("Content-Type", 'application/json');
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }
    
    //res.send(JSON.stringify(user));
    //console.log(JSON.stringify(user));
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send(JSON.stringify(user))
        } else {
            res.send(null)
            console.log('Invalid Password')
        }
    } catch {
        res.status(500).send()
    }
});

/*  Handle the user's request for signing up an account.
    Hash the user's password and store it in mongoDB along with
    the username and closet(initially empty). 
    Error case: 1. If the username is already taken. */
router.post('/signup', async (req, res) => {
    let closet = new Closet();
    const existingUser = await closet.getClosetData(req.body.username);
    if (existingUser !== null) {
        return res.status(400).send('The username is already taken');
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            username: req.body.username,
            password: hashedPassword
        })
        user.save()
        .then(data => {
            res.send(JSON.stringify(data))
        })
        .catch(error => {
            res.send(JSON.stringify(error))
        });
        res.header("Content-Type", 'application/json');
    } catch {
        res.status(500).send()
    }
});

//Get the user's closet data
router.post('/closet', async (req, res) => {
    let closet = new Closet();
    try {
        console.log("requsername: "+req.body.username);
        const data = await closet.getClosetData(req.body.username);
        
        //console.log(data);
        const closetData = data.closet;
        console.log("closet data:" + closetData);
        res.send(closetData);
    } catch {
        res.status(500).send();
    }
    
    
})

//Handles the user's request to add a clothing item to the closet.
//Adds it to the mongoDB.
router.post('/addClothing', async (req, res) => {
    try {
        const username = req.body.username;
        const clothing = req.body.clothing;
        let closet = new Closet();
        let clothingData = await closet.addClothingData(username, clothing)
        res.header("Content-Type", 'application/json');
        res.send(clothingData); // previous state of closet
    } catch {
        res.status(500).send()
    }
})

//Handles the user's request to delete a clothing item to the closet.
//Deletes it from the mongoDB.
router.post('/delClothing', async (req, res) => {
    try {
        const username = req.body.username;
        const clothing = req.body.clothing;
        let closet = new Closet();
        let clothingData = await closet.delClothingData(username, clothing)
        res.header("Content-Type", 'application/json');
        res.send(clothingData); // previous state of closet
    } catch {
        res.status(500).send()
    }
})

//Handles the user's request to find the best fits from the closet.
router.post('/findBestFits', async (req, res) => {
    try {
        const username = req.body.username;
        let closet = new Closet();
        const data = await closet.getClosetData(username);
        const clothingItems = data.closet;
        let bestFits = closet.findBestFits(clothingItems)
        
        res.send(bestFits);
    } catch {
        res.status(500).send()
    }
})


module.exports = router;