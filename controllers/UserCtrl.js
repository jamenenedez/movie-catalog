'use strict'

const mongoose = require('mongoose');

var in_array = require('in_array');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config/config');

var User = require("../models/User");
var Movie = require("../models/Movie");

const UserController = {};
var url = require('url');

UserController.details = async (req, res, err) => {
    await User.findById(req.params.id).select('-__v -password')
        .populate({ path: 'scores.movie', populate: { path: 'movie' } })
        .then((user) => {
            if (user) {
                res.status(200).jsonp(user);
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
}

UserController.delete = async (req, res, err) => {

    await User.findByIdAndRemove(req.params.id).select('-__v -password')
        .populate({ path: 'scores.movie', populate: { path: 'movie' } })
        .then((user) => {
            if (user) {
                res.status(200).jsonp(user);
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

UserController.save = async (req, res, err) => {

    var user = new User(req.body);
    await user.save().then(async (enhanced_user) => {
        var enhanced_user = await User.findById(enhanced_user._id).select('-__v -password')
            .populate({ path: 'scores.movie', populate: { path: 'movie' } });
        res.status(200).jsonp(enhanced_user);
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

UserController.singUp = (req, res, err) => {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
            if (err) {
                res.status(500).jsonp({
                    message: err
                });
            } else {
                const user = new User({
                    login: req.body.login,
                    email: req.body.email,
                    password: hash
                });
                await user.save();
                res.status(201).jsonp({
                    message: 'User added successfully'
                });
            }
        });
    });
}

UserController.signIn = (req, res) => {
    User.findOne({ login: req.body.login }, function (err, user) {
        if (err) {
            res.status(500).jsonp({
                message: err
            });
        } else if (user === null) {
            res.status(200).jsonp({
                message: 'Usuario invalido'
            });
        } else {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        user
                    }, config.SECRET_KEY);
                    res.status(200).jsonp({
                        status: true,
                        menssage: 'Authenticated User',
                        token: token,
                        details: 'Correctly authenticated'
                    });
                } else {
                    res.status(403).jsonp({
                        status: false,
                        menssage: 'Bad credentials',
                        token: '',
                        details: err
                    });
                }
            });
        }
    });
}

UserController.list = (req, res) => {
    jwt.verify(req.token, config.SECRET_KEY, async (err, user) => {
        if (err) {
            res.status(403).jsonp({
                message: err
            });
        } else {
            var params = {};
            for (key in req.query) {
                // check if the params are corrects for find
                if (in_array(key, Object.keys(User.schema.paths))) {
                    req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
                }
            }
            await User.find({ $or: [params] }).select('-__v -password')
                .populate({ path: 'scores.movie', populate: { path: 'movie' } })
                .then((user) => {
                    if (user) {
                        res.status(200).jsonp(user);
                    } else {
                        res.status(404).jsonp("Not found");
                    }
                }).catch((error) => {
                    res.status(500).jsonp(error.message);
                });
        }
    });
}

UserController.edit = (req, res) => {
    jwt.verify(req.token, config.SECRET_KEY, async (err, data) => {
        if (err) {
            res.status(403).jsonp({ error: err });
        } else {
            if (data.user._id == req.params.id) {
                const { id } = req.params;
                User.findByIdAndUpdate(id, req.body, { new: true }).select('-__v').populate('movies', 'name -_id').then((user) => {
                    if (user) {
                        res.status(200).jsonp(user);
                    } else {
                        res.status(404).jsonp("Not found");
                    }
                }).catch((error) => {
                    res.status(500).jsonp(error.message);
                });
            } else {
                res.status(403).jsonp({
                    error: 'Usuario no autorizado a realizar este cambio'
                });
            }
        }
    });
}

UserController.qualifyMovies = async (req, res) => {

    var user = await User.findById(req.params.id).exec();

    if (user) {
        if (user.scores.length > 0) {
            var found = false;
            user.scores.forEach(calification => {
                if (calification.movie.equals(req.params.movie_id)) {
                    calification.score = req.body.score;
                    found = true;
                }
            });
            if (!found) {
                user.scores.push({ movie: req.params.movie_id, score: req.body.score });
            }
        } else {
            user.scores.pu({ movie: req.params.movie_id, score: req.body.score });
        }

        var updated_user = await user.save();

        if (updated_user) {
            var movie = await Movie.findById(req.params.movie_id).exec();
            var total_score = 0;
            if (movie != null) {
                /* if (movie.scores != null) { */
                    if (movie.scores.length > 0) {
                        var found = false;
                        movie.scores.forEach(calification => {
                            if (calification.user.equals(req.params.id)) {
                                calification.score = req.body.score;
                                found = true;
                            }
                        });
                        if (!found) {
                            movie.scores.push({ user: req.params.id, score: req.body.score });
                        }
                    } else {
                        movie.scores.push({ user: req.params.id, score: req.body.score });
                    }
                    movie.scores.forEach(calification => {
                        total_score += calification.score;
                    });
                    movie.calification = total_score/movie.scores.length;
                /* } */
                /* else {
                    movie.scores.push({ user: req.params.id, score: req.body.score });
                } */
            }
            var updated_movie = await movie.save();
            res.status(200).jsonp(updated_user);
        }
    }
}
module.exports = UserController; 