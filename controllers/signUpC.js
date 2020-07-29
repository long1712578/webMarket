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
    //alert('xin chao');
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        res.render('signUp', { layout: 'layout', reCAPTCHA: true });
        //alert("123");
        return;
    }
    var secretKey = "6LdV7scUAAAAAFBGDExCIrmJx6DBS7kvqCEvj36I";
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if (body.success !== undefined && !body.success) {
            res.render('signUp', { layout: 'layout', reCAPTCHA: true });
        }
        const username = req.body.username;
        const password = req.body.password;
        const salt = Date.now().toString(16);
        const preHash = password + salt;
        const hash = sha('sha256').update(preHash).digest('hex');
        const pwHash = hash + salt;
        const user = {
            f_Username: username,
            f_Password: pwHash,
            f_Fullname: req.body.fullname,
            f_Email: req.body.email,
            f_Address: req.body.address,
            f_Permission: 0
        }
        const uId = account.add(user);

        res.redirect('/signIn');
    });
});

module.exports = router;