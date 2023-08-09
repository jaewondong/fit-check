
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Closet = require('./Closet');
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
  const apiInfo = {
    name: 'Closet API',
    description: 'This API provides endpoints for user registration, login, and more. For more information, please visit https://github.com/jaewondong/fit-check',
    version: '1.0',
    author: 'Jaewon Dong',
  };

  res.json(apiInfo);
});

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
        if (bcrypt.compare(req.body.password, user.password)) {
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
        
        const closetData = data.closet;
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
        res.status(500).send();
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
        res.status(500).send();
    }
})

//Handles the user's request to find the best fits from the closet.
router.post('/findBestFits', async (req, res) => {
    try {
        const username = req.body.username;
        let closet = new Closet();
        const data = await closet.getClosetData(username);
        const clothingItems = data.closet;
        let bestFits = await closet.findBestFits(clothingItems);
        res.header("Content-Type", 'application/json');
        res.send(bestFits);
    } catch (error) {
        console.log("error", error)
        res.status(500).send();
    }
})

//Handles the user's request to calculate the score of an outfit chosen.
router.post('/score', async (req, res) => {
    try {
        const outfit = req.body.outfit;
        const top = outfit.find(clothing => clothing.type == "top");
        const bot = outfit.find(clothing => clothing.type == "bot");
        const shoes = outfit.find(clothing => clothing.type == "shoes");
        let closet = new Closet();
        let result = await closet.findScores(top, bot, shoes);
        res.header("Content-Type", 'application/json');
        res.send(result);
    } catch {
        res.status(500).send();
    }
})


module.exports = router;