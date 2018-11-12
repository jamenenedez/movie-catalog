const mongoose = require('mongoose');
var in_array = require('in_array');
var Movie = require("../models/Movie");
var Ranking = require("../models/Ranking");
const MovieController = {};
var url = require('url');

MovieController.getByID = function (req, res, err) {
    Movie.findById(req.params.id, function (err, movies) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(movies);
        }
    });
};

MovieController.getAllByAttributes = function (req, res, err) {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Movie.schema.paths))) {
            req.query[key] !== "" ? params[key] = req.query[key] : null;
        }
    }
    Movie.find({ $or: [params] }, function (err, movies) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(movies);
        }
    });
};

MovieController.update = function (req, res, err) {
    Movie.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, movie) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(movie);
        }
    );
};

MovieController.delete = function (req, res, err) {
    Movie.findById(req.params.id, function (err, movie) {
        if (err) {
            res.send(503, err.message);
        } else {
            if (!movie) {
                res.status(404).send();
            } else {
                movie.remove(function (err, removedMovie) {
                    if (err) {
                        res.send(503, err.message);
                    } else {
                        res.send(removedMovie);
                    }
                });
            }
        }
    });
};

MovieController.save = function (req, res, err) {
    var movie = new Movie(req.body);

    movie.save({}, function (err, movie) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(movie);
        }
    });
};

MovieController.qualify = function (req, res, err) {
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
}

module.exports = MovieController;