const mongoose = require('mongoose');
var in_array = require('in_array');
var User = require("../models/User");
const UserController = {};
var url = require('url');

UserController.getUserByID = function (req, res, err) {
    User.findById(req.params.id, function (err, users) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(users);
        }
    });
};

UserController.getUsersByAttributes = function (req, res, err) {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(User.schema.paths))) {
            req.query[key] !== "" ? params[key] = req.query[key] : null;
        }
    }
    User.find({ $or: [params] }, function (err, users) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(users);
        }
    });
};

UserController.updateUser = function (req, res, err) {
    User.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, user) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(user);
        }
    );
};

UserController.deleteUser = function (req, res, err) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.send(503, err.message);
        } else {
            if (!user) {
                res.status(404).send();
            } else {
                user.remove(function (err, removedUser) {
                    if (err) {
                        res.send(503, err.message);
                    } else {
                        res.send(removedUser);
                    }
                });
            }
        }
    });
};

UserController.saveUser = function (req, res, err) {
    var user = new User(req.body);

    user.save({}, function (err, user) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(user);
        }
    });
};

module.exports = UserController;