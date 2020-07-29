const express = require('express');
const router = express.Router();
const account = require('../models/accountM');
const sha = require('sha.js');
const request = require('request');

const hashLength = 64;

router.get("/signUp", (req, res) => {
    res.render('signUp', { layout: 'layout' });
});

router.post('/signUp', (req, res) => {
    alert('xin chao');
    
});

module.exports = router;