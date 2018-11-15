const mongoose = require('mongoose');
var in_array = require('in_array');
var Director = require("../models/Director");
var Nationality = require("../models/Nationality");
var Movie = require("../models/Movie");
const DirectorController = {};
var url = require('url');

DirectorController.details = async (req, res, err) => {
    await Director.findById(req.params.id).select('-__v').populate('nationality movies', 'name -_id').then((director) => {
        if (director) {
            res.status(200).jsonp(director);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

DirectorController.list = async (req, res, err) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Director.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    await Director.find({ $or: [params] }).select('-__v').populate('nationality movies', 'name -_id').then((directors) => {
        if (directors) {
            res.status(200).jsonp(directors);
        } else {
            res.status(404).jsonp("Not found anyone");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

DirectorController.update = async (req, res, err) => {
    Director.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },
    ).select('-__v').populate('nationality movies', 'name -_id').then((director) => {
        if (director) {
            res.status(200).jsonp(director);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

DirectorController.delete = async (req, res, err) => {

    await Director.findByIdAndRemove(req.params.id).select('-__v').populate('nationality movies', 'name -_id').then((director) => {
        if (director) {
            res.status(200).jsonp(director);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

DirectorController.save = async (req, res, err) => {

    var director = new Director(req.body);
    await director.save().then(async () => {
        if (director.nationality != "") {
            const nationality = await Nationality.findById(director.nationality);
            nationality.directors.push(director._id);
            await nationality.save().then().catch(function (error) { res.status(500).jsonp(error.message); });
        }
        if (typeof req.body.movies != "undefined") {
            if (req.body.movies.size < 3 && req.body.movies.size > 0) {
                director.movies.forEach(movie => {
                    if (movie.director != "") {
                        movie.director = req.body.director;
                        movie.save();
                    } else {
                        res.status(500).jsonp("A director is needed" + movie.name);
                    }
                });
            }
        }
        var enhanced_director = await Director.findById(director._id).select('-__v').populate('nationality movies', 'name -_id');
        res.status(200).jsonp(enhanced_director);
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

module.exports = DirectorController; 