
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

router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            username: req.body.username,
            password: hashedPassword
        })
        user.save()
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        });
        res.header("Content-Type", 'application/json');
    } catch {
        res.status(500).send()
    }
});


module.exports = router;