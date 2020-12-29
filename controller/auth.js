const express = require('express');

const mongoose = require('mongoose');
require('../models/employees_model');
const Userschema = mongoose.model('Userschema');
const router = express.Router();
router.get('/userLogin', (req, res) => {
    req.session.destroy(err => {
        console.log(err);
    });
    res.render('employee/userLogin', { layout: 'login.hbs', isAuthenticated: false })
})
router.post('/userLogin', (req, res) => {
    Userschema.findOne({ username: req.body.login })
        .then(user => {
            if (!user) {
                return res.redirect('/userLogin');
            } else if (user.username == req.body.login) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    console.log(err);

                    res.redirect('/employee');
                })
            } else { res.redirect('/userLogin'); }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/userLogin');
        });

})


module.exports = router;