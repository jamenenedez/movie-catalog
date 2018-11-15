const mongoose = require('mongoose');
var in_array = require('in_array');
var Nationality = require("../models/Nationality");
const NationalityController = {};
var url = require('url');

NationalityController.getByID = function (req, res, err) {
    Nationality.findById(req.params.id, function (err, Nationality) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(Nationality);
        }
    });
}

NationalityController.getAllByAttributes = function (req, res, err) {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Nationality.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Nationality.find({ $or: [params] }, function (err, Nationalitys) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(Nationalitys);
        }
    });
};

NationalityController.update = function (req, res, err) {
    Nationality.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, Nationality) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(Nationality);
        }
    );
};

NationalityController.delete = function (req, res, err) {
    Nationality.findById(req.params.id, function (err, Nationality) {
        if (err) {
            res.send(503, err.message);
        } else {
            if (!Nationality) {
                res.status(404).send();
            } else {
                Nationality.remove(function (err, removedNationality) {
                    if (err) {
                        res.send(503, err.message);
                    } else {
                        res.send(removedNationality);
                    }
                });
            }
        }
    });
};

NationalityController.save = function (req, res, err) {
    var Nationality = new Nationality(req.body);

    Nationality.save({}, function (err, Nationality) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(Nationality);
        }
    });
};

module.exports = NationalityController; 