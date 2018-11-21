var in_array = require('in_array');
var Director = require("../models/director");
var Nationality = require("../models/nationality");
/* var Movie = require("../models/movie"); */
const directorController = {};

directorController.getOne = (req, res) => {
    const { id } = req.params;
    Director.findById(id)
        .select('-__v')
        .populate('nationality movies', 'name')
        .then((director) => {
            if (director) {
                res.status(200).jsonp(director);
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
}

directorController.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Director.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Director.find({ $or: [params] })
        .select('-__v')
        .populate('nationality movies', 'name')
        .then((directors) => {
            if (directors.length > 0) {
                res.status(200).jsonp(directors);
            } else {
                res.status(404).jsonp("Not found anyone");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

directorController.update = (req, res) => {
    const { id } = req.params;
    Director.findByIdAndUpdate(
        id,
        req.body,
        { new: true },
    ).select('-__v')
        .populate('nationality movies', 'name')
        .then((director) => {
            if (director) {
                res.status(200).send({ message: 'Director successfuly updated!' });
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

directorController.delete = (req, res) => {
    const { id } = req.params;
    Director.findByIdAndRemove(id)
        .then((director) => {
            if (director) {
                res.status(200).send({ message: 'Director successfuly deleted!' });
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

directorController.create = (req, res) => {

    var director = new Director({
        fullname: req.body.fullname,
        nationality: req.body.nationality,
        movies: req.body.movies
    });
    director.save().then(() => {
        /* if (director.nationality != "") {
            const nationality = await Nationality.findById(director.nationality);
            nationality.directors.push(director._id);
            nationality.save().then().catch((error) => { res.status(500).jsonp(error.message); });
        } */
        /* if (typeof req.body.movies != "undefined") {
            if (req.body.movies.size > 0 && req.body.movies.size < 3) {
                director.movies.forEach(movie => {
                    if (movie.director != "") {
                        movie.director = req.body.director;
                        movie.save();
                    } 
                });
            }
        } */
        /*  var enhanced_director = await Director.findById(director._id).select('-__v').populate('nationality movies', 'name -_id');
         res.status(200).jsonp(enhanced_director); */
        res.status(200).send({ message: 'Director successfuly created!' });
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

module.exports = directorController; 