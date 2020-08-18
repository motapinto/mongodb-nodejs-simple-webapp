const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// Login page
router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch(err) {
        res.status(404).json({message: err});
    }
});

// Register page
router.get('/register', async (req, res) => {
    try {
        res.render('register');
    } catch(err) {
        res.status(404).json({message: err});
    }
});

// Register handle
router.post('/register', async (req, res) => {  
    let { username, password, confirmPassword } = req.body;
    let errors = [];

    if(!username || !password || !confirmPassword) {
        errors.push({ msg: "Please fill in all fields!"});
    }
    if(password !== confirmPassword) {
        errors.push({ msg: "Passwords don't not match!"}); 
    }
    if(username === password) {
        errors.push({ msg: "Username and password can't be the same!"}); 
    }
     if(password.length < 6) {
        errors.push({ msg: "Password should be at least 6 characters!"}); 
    }

    try {
        let user = await User.findOne({'_username': username});
        if(user) {
            errors.push({ msg: "A user with this username already exists"}); 
        }
    } catch(err) {
        console.log(err);
    }
    
    if(errors.length > 0) {
        res.status(403).render( 'register', {
            errors, 
            username,
            password,
            confirmPassword
        });
    } else {
        // Hash Password
        bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) throw err;
                password = hash;
            })
        );

        const user = new User({
            username: username,
            password: password
        });

        try {
            const savedUser = await user.save();
            res.status(200).render('login', {
                username
            });
        } catch(err) {
            res.status(404).json({message: err});
        }
    }
});

module.exports = router;

/*
PROBLEMS::
register - does not print error messages if failed
register - if i try to password.length < 6 gives undefined???

*/