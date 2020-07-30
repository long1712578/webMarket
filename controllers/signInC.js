const express = require('express');
const router = express.Router();
const sha = require('sha.js');
const account = require('../models/accountM');

const hashLength = 64;

router.get('/signIn', (req, res) => {
    res.render('signIn', { layout: 'layout'});
})

router.post('/signIn', async (req, res) => {
    //alert("123");
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        res.render('signIn', { layout: 'layout', reCAPTCHA: true });
        //alert("123");
        return;

    }
    const username = req.body.username;
    const password = req.body.password;
    const user = await account.getByUsername(username);
    if(user == null) {
        res.render('signIn', {layout: 'layout', showAlert: true});
        return;
    }
    const pwDb = user.f_Password;
    const salt = pwDb.substring(hashLength, pwDb.length);
    console.log("slai: "+pwDb.length);
    const preHash = password + salt;
    const hash = sha('sha256').update(preHash).digest('hex');
    const pwHash = hash + salt;
    if(pwHash === pwDb) {
        console.log("oke 123");
        req.session.user = user.f_ID;
        res.redirect('/');
    }
    else {
        res.render('signIn', {layout: 'layout', showAlert: true});
        return;
    }
});

module.exports = router;