const actorController = {};
var in_array = require('in_array');
var Actor = require("../models/actor");
var Nationality = require("../models/nationality");
/* var Movie = require("../models/movie"); */

actorController.getOne = (req, res) => {
    const { id } = req.params;
    Actor.findById(id)
        .select('-__v')
        .populate('nationality movies', 'name -_id')
        .then((actor) => {
            if (actor) {
                res.status(200).jsonp(actor);
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
}

actorController.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Actor.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Actor.find({ $or: [params] })
        .select('-__v')
        .populate('nationality movies', 'name -_id')
        .then((actors) => {
            if (actors.length > 0) {
                res.status(200).jsonp(actors);
            } else {
                res.status(404).jsonp("Not found anyone");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

actorController.update = (req, res) => {
    const { id } = req.params;
    Actor.findByIdAndUpdate(
        id,
        req.body,
        { new: true },
    ).select('-__v')
        .populate('nationality movies', 'name -_id')
        .then((actor) => {
            if (actor) {
                res.status(200).send({ message: 'Actor successfuly updated!' });
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

actorController.delete = (req, res) => {
    const { id } = req.params;
    Actor.findByIdAndRemove(id)
        .then((actor) => {
            if (actor) {
                res.status(200).send({ message: 'Actor successfuly deleted!' });
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

actorController.create = (req, res) => {
    var actor = new Actor({
        fullname: req.body.fullname,
        nationality: req.body.nationality,
        movies: req.body.movies,
    });
    actor.save().then(() => {
        /* if (actor.nationality != "") {
            const nationality = await Nationality.findById(actor.nationality);
            nationality.actors.push(actor._id);
            nationality.save().then(() => { }).catch((error) => { res.status(500).jsonp(error.message); });
        }
        if (typeof req.body.movies != "undefined") {
            if (req.body.movies.size > 0 && req.body.movies.size < 3) {
                actor.movies.forEach(movie => {
                    if (movie.actors.length < 3) {
                        movie.actors.push(actor._id);
                        movie.save();
                    } else {
                        res.status(500).jsonp("To many actors, just 3 needed for movie " + movie.name);
                    }
                });
            }
        } */
        /*  var enhanced_actor = await Actor.findById(actor._id)
             .select('-__v').populate('nationality movies', 'name -_id');
         res.status(200).jsonp(enhanced_actor); */
        res.status(200).send({ message: 'Actor successfuly created!' });
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

module.exports = actorController; 