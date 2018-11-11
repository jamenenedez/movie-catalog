const mongoose = require('mongoose');
var in_array = require('in_array');
var Gender = require("../models/Gender");
const GenderController = {};
var url = require('url');

GenderController.getGenderByID = function (req, res, err) {
    Gender.findById(req.params.id, function (err, gender) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(gender);
        }
    });
};

GenderController.getGendersByAttributes = function (req, res, err) {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Gender.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Gender.find({ $or: [params] }, function (err, genders) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(genders);
        }
    });
};

GenderController.updateGender = function (req, res, err) {
    Gender.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, gender) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(gender);
        }
    );
};

GenderController.deleteGender = function (req, res, err) {
    Gender.findById(req.params.id, function (err, gender) {
        if (err) {
            res.send(503, err.message);
        } else {
            if (!gender) {
                res.status(404).send();
            } else {
                gender.remove(function (err, removedGender) {
                    if (err) {
                        res.send(503, err.message);
                    } else {
                        res.send(removedGender);
                    }
                });
            }
        }
    });
};

GenderController.saveGender = function (req, res, err) {
    var gender = new Gender(req.body);

    gender.save(req.body, function (err, gender) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(gender);
        }
    });
};

module.exports = GenderController;