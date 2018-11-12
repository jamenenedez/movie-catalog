const mongoose = require('mongoose');
var in_array = require('in_array');
var Actor = require("../models/Actor");
const ActorController = {};
var url = require('url');

ActorController.getByID = function (req, res, err) {
    Actor.findById(req.params.id, function (err, actor) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(actor);
        }
    });
}

ActorController.getAllByAttributes = function (req, res, err) {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Actor.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Actor.find({ $or: [params] }, function (err, actors) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(actors);
        }
    });
};

ActorController.update = function (req, res, err) {
    Actor.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, actor) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(actor);
        }
    );
};

ActorController.delete = function (req, res, err) {
    Actor.findById(req.params.id, function (err, actor) {
        if (err) {
            res.send(503, err.message);
        } else {
            if (!actor) {
                res.status(404).send();
            } else {
                actor.remove(function (err, removedActor) {
                    if (err) {
                        res.send(503, err.message);
                    } else {
                        res.send(removedActor);
                    }
                });
            }
        }
    });
};

ActorController.save = function (req, res, err) {
    var actor = new Actor(req.body);

    actor.save({}, function (err, actor) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(actor);
        }
    });
};

module.exports = ActorController; 