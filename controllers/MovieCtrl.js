const mongoose = require('mongoose');
var in_array = require('in_array');
var Gender = require("../models/Gender");
var Actor = require("../models/Actor");
var Director = require("../models/Director");
var Category = require("../models/Category");
var Movie = require("../models/Movie");
const MovieController = {};
var url = require('url');

MovieController.details = async (req, res, err) => {
    await Movie.findById(req.params.id).select('-__v').populate('movies actors directors categories', 'name -_id').then((movie) => {
        if (movie) {
            res.status(200).jsonp(movie);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

MovieController.list = async (req, res, err) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Movie.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    await Movie.find({ $or: [params] }).select('-__v').populate('movies actors directors categories', 'name -_id').then((movies) => {
        if (movies) {
            res.status(200).jsonp(movies);
        } else {
            res.status(404).jsonp("Not found anyone");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

MovieController.update = async (req, res, err) => {
    Movie.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },
    ).select('-__v').populate('movies actors directors categories', 'name -_id').then((movie) => {
        if (movie) {
            res.status(200).jsonp(movie);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

MovieController.delete = async (req, res, err) => {

    await Movie.findByIdAndRemove(req.params.id).populate('movies actors directors categories', 'name -_id').then((movie) => {
        if (movie) {
            res.status(200).jsonp(movie);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

MovieController.save = async (req, res, err) => {

    var movie = new Movie(req.body);
    await movie.save().then(async (enhanced_movie) => {
        var enhanced_movie = await Movie.findById(enhanced_movie._id).select('-__v').populate('movies actors directors categories', 'name -_id');
        res.status(200).jsonp(enhanced_movie);
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

MovieController.qualify = async (req, res, err) => {
    Movie.findOneAndUpdate();
    
    Ranking.findOneAndUpdate({ movie_id: req.params.id, user_id: req.body.user_id },
        { $set: { score: req.body.score } }, { upsert: true, new: true },
        function (err, rank) {
            if (err) {
                res.send(503, error.message);
            }
            else {
                Ranking.find({ movie_id: req.params.id }, function (err, ranks) {
                    var count_users = 0;
                    var total_score = 0;
                    ranks.forEach(rank => {
                        total_score += rank.score;
                        count_users++;
                    });
                    Movie.findByIdAndUpdate(req.params.id, { $set: { score: ((total_score) / (count_users)) } }, 
                    {new: true},
                        function (error, movie) {
                            if (error) {
                                res.status(503).send(error.message);
                            } else {
                                res.status(200).jsonp(movie);
                            }
                        });
                });
            }
        }
    );    
};

module.exports = MovieController; 