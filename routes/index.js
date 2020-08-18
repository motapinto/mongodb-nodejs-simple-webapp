const express = require('express');
const router = express.Router();

// HomePage
router.get('/', async (req, res) => {
    try {
        res.render('home');
    } catch(err) {
        res.status(404).json({message: err});
    }
});

module.exports = router;