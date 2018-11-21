var in_array = require('in_array');
/* var Gender = require("../models/gender");
var Actor = require("../models/Actor");
var Director = require("../models/director");
var Category = require("../models/category"); */
var Movie = require("../models/movie");
const movieController = {};
var url = require('url');

movieController.getOne = (req, res) => {
    const { id } = req.params;
    Movie.findById(id).select('-__v')
        .populate('actors director', 'fullname')
        .populate('movies genders country category', 'name')
        .populate({ path: 'scores.user', populate: { path: 'user' } })
        .then((movie) => {
            if (movie) {
                res.status(200).jsonp(movie);
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
}

movieController.getAll = async (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Movie.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    await Movie.find({ $or: [params] }).select('-__v')
        .populate('actors director', 'fullname')
        .populate('movies genders country category', 'name')
        .populate({ path: 'scores.user', populate: { path: 'user' } }).then((movies) => {
            if (movies.length > 0) {
                res.status(200).jsonp(movies);
            } else {
                res.status(404).jsonp("Not found anyone");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

movieController.update = (req, res) => {
    const { id } = req.params;
    Movie.findByIdAndUpdate(
        id,
        req.body,
        { new: true },
    ).then((movie) => {
        if (movie) {
            res.status(200).send({ message: 'Movie successfuly updated!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

movieController.delete = (req, res) => {
    const { id } = req.params;
    Movie.findByIdAndRemove(id)
        .then((movie) => {
            if (movie) {
                res.status(200).send({ message: 'Movie successfuly deleted!' });
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

movieController.create = (req, res) => {
    console.log(req.body);
    
    var movie = new Movie({
        title: req.body.title,
        category: req.body.category,
        genders: req.body.genders,
        year: req.body.year,
        country: req.body.country,
        duration: req.body.duration,
        calification: req.body.calification,
        scores: req.body.scores,
        director: req.body.director,
        actors: req.body.actors,
    });
    movie.save().then(() => {
        res.status(200).send({ message: 'Movie successfuly created!' });
       
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

module.exports = movieController; 