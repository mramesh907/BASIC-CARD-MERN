const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.model.js');
const router = express.Router();



router.post('/register', async (req, res) => {
    const { name, email, age } = req.body;

    try {
        const userData = await User.create({
            name,
            email,
            age
        });

        res.status(201).json(userData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;