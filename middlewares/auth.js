'use strict'

const services = require('../services');

function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "Forbbiden" });
    }

    var token = req.headers.authorization.split(" ")[1];
    services.decodeToken()
        .then(response => {
            req.user = response.user;
            next();
        }).catch(response => {
            res.status(response.status);
        });
}

module.exports = isAuth;