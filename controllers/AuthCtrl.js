'use strict'

const User = require('../models/User');
const service = require('../services');

function singUp(req, res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    });

    user.save((err) => {
        if (err) {
            return res.status(500).send({ message: 'Error while creating user: ${err}' });
        }
        return res.status(201).send({ token: service.createToken(user) });
    });
}

module.exports = {
    signUp
}