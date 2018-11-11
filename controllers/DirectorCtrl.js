const mongoose = require('mongoose');
var in_array = require('in_array');
var Director = require("../models/Director");
const DirectorController = {};
var url = require('url');

DirectorController.getDirectorByID = function (req, res, err) {
    Director.findById(req.params.id, function (err, director) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(director);
        }
    });
};

DirectorController.getDirectorsByAttributes = function (req, res, err) {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Director.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Director.find({ $or: [params] }, function (err, directors) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(directors);
        }
    });
};

DirectorController.updateDirector = function (req, res, err) {
    Director.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, director) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(director);
        }
    );
};

DirectorController.deleteDirector = function (req, res, err) {
    Director.findById(req.params.id, function (err, director) {
        if (err) {
            res.send(503, err.message);
        } else {
            if (!director) {
                res.status(404).send();
            } else {
                director.remove(function (err, removedDirector) {
                    if (err) {
                        res.send(503, err.message);
                    } else {
                        res.send(removedDirector);
                    }
                });
            }
        }
    });
};

DirectorController.saveDirector = function (req, res, err) {
    var director = new Director(req.body);
    director.save({}, function (err, director) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(director);
        }
    });
};

module.exports = DirectorController;