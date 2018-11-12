const mongoose = require('mongoose');
var in_array = require('in_array');
var User = require("../models/User");
var Movie = require("../models/Movie");
var Ranking = require("../models/Ranking");
const UserController = {};
var url = require('url');
var assert = require('assert');


UserController.getByID = function (req, res, err) {
    User.findById(req.params.id, function (err, users) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(users);
        }
    });
};

UserController.getAllByAttributes = function (req, res, err) {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(User.schema.paths))) {
            if (key != "_id") {
                req.query[key] !== "" ? params[key] = req.query[key] : null;
            }
        }
    }
    User.find({ $or: [params] }, function (err, users) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(users);
        }
    });
};

UserController.update = function (req, res, err) {
    User.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, user) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(user);
        }
    );
};

UserController.delete = function (req, res, err) {
    User.findOneAndRemove(req.params.id, (err, user) => {
        // As always, handle any potential errors:
        if (err) res.send(503, err.message);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        else {
            const response = {
                message: "User successfully deleted",
                id: user._id
            };
            //res.status(200).jsonp(user); 
            res.status(200).send(response);
        }
    });
};

UserController.save = function (req, res, err) {
    var user = new User(req.body);

    user.save({}, function (err, user) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(user);
        }
    });
};

UserController.qualifyMovie = function (req, res, err) {

    Ranking.findOneAndUpdate({ movie_id: req.body.movie_id, user_id: req.params.id }, { $set: { score: req.body.score } });

    Ranking.find({ movie_id: req.body.movie_id }, function (err, ranks) {
        var count_users = ranks.length;
        // verify if the user has a qualification for this movie                        
        Ranking.findOne({ movie_id: req.body.movie_id, user_id: req.params.id },
            function (error, rank) {
                if (!rank) {
                    console.log("no existe");
                    new_rank = new Ranking({
                        movie_id: req.body.movie_id,
                        user_id: req.params.id,
                        score: req.body.score
                    });
                    new_rank.save({}, function (err, rank) {
                        if (err) {
                            res.send(503, err.message);
                        } else {
                            var total_score = 0;
                            ranks.forEach(rank => {
                                total_score += rank.score;
                            });
                            var score = (total_score + rank.score) / (count_users + 1);
                            Movie.findByIdAndUpdate(req.body.movie_id, { $set: { score: score } },
                                function (error, movie) {
                                    if (error) {
                                        res.send(503, error.message);
                                    } else {
                                        res.status(200).jsonp(movie);
                                    }
                                });
                        }
                    });
                }
                else {
                    console.log("existe");
                    Ranking.findByIdAndUpdate(rank._id, { $set: { score: req.body.score } },
                        function (error, rank) {
                            if (error) {
                                res.send(503, error.message);
                            } else {
                                var total_score = 0;
                                ranks.forEach(inner_rank => {
                                    total_score += inner_rank.score;
                                });
                                var score = (total_score) / (count_users);
                                Movie.findByIdAndUpdate(req.body.movie_id, { $set: { score: score } },
                                    function (error, movie) {
                                        if (error) {
                                            res.send(503, error.message);
                                        } else {
                                            res.status(200).jsonp(movie);
                                        }
                                    });
                            }
                        });
                }
            });
    });
}

module.exports = UserController;