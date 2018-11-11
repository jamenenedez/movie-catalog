var mongoose = require('mongoose');
var in_array = require('in_array');
var Movie = mongoose.model('Movie');
var url = require('url');

/*exports.getMovies = function (req, res, err) {
    Movie.find({}, function (err, movies) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(movies);
        }
    });
};*/

exports.getMovieByID = function (req, res, err) {
    Movie.findById(req.params.id, function (err, movies) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(movies);
        }
    });
};

exports.getMoviesByAttributes = function (req, res, err) {
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

exports.updateMovie = function (req, res, err) {
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

exports.deleteMovie = function (req, res, err) {
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

exports.saveMovie = function (req, res, err) {
    var movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        gender: req.body.gender,
    });

    movie.save({}, function (err, movie) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(movie);
        }
    });
};