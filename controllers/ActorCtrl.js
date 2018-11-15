const mongoose = require('mongoose');
var in_array = require('in_array');
var Actor = require("../models/Actor");
var Nationality = require("../models/Nationality");
const ActorController = {};
var url = require('url');

ActorController.getByID = async (req, res, err) => {
    await Actor.findById(req.params.id).select('-__v').populate('nationality', 'name -_id').then((actor) => {
        if (actor) {
            res.status(200).jsonp(actor);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

ActorController.getAllByAttributes = async (req, res, err) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Actor.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    await Actor.find({ $or: [params] }).select('-__v').populate('nationality', 'name -_id').then((actors) => {
        if (actors) {
            res.status(200).jsonp(actors);
        } else {
            res.status(404).jsonp("Not found any");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

ActorController.update = async (req, res, err) => {
    Actor.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },
    ).select('-__v').populate('nationality', 'name -_id').then((actor) => {
        if (actor) {
            res.status(200).jsonp(actor);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

ActorController.delete = async (req, res, err) => {

    await Actor.findByIdAndRemove(req.params.id).select('-__v').populate('nationality', 'name -_id').then((actor) => {
        if (actor) {
            res.status(200).jsonp(actor);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

ActorController.save = async (req, res, err) => {

    var actor = new Actor(req.body);
    await actor.save().then(async () => {
        if (actor.nationality != "") {
            const nationality = await Nationality.findById(actor.nationality);
            nationality.actors.push(actor._id);
            await nationality.save().then().catch(function (error) { res.status(500).jsonp(error.message); });
        }
        if (typeof req.body.movies != "undefined") {
            if (req.body.movies.size < 3 && req.body.movies.size > 0) {
                actor.movies.forEach(movie => {
                    if (movie.actors.length < 3) {
                        movie.actors.push(actor._id);
                        movie.save();
                    } else {
                        res.status(500).jsonp("To many actors, just 3 needed for movie " + movie.name);
                    }
                });
            }
        }
        var enhanced_actor = await Actor.findById(actor._id).select('-__v').populate('nationality', 'name -_id');
        res.status(200).jsonp(enhanced_actor);
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

module.exports = ActorController; 