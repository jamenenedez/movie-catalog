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
    User.findById(req.params.id).then(async (error, user) => {
        //Updating user scores.
        req.body.scores.forEach(movie_score => {
            user.scores.forEach(user_score => {
                if (movie_score.movie == user_score.movie) {
                    user_score.score = movie_score.score;
                } else {
                    user_score.create(movie_score);
                }
            });
        });

        user = await user.save();

        //Updating movies scores.
        user.scores.forEach(user_score => {
            req.body.scores.forEach(movie_score => {
                Movie.findById(movie_score.movie).then((error, movie) => {
                    movie.scores.forEach(inner_user_score => {
                        if (inner_user_score.user == user._id) {
                            inner_user_score.score = movie_score.score;
                        } else {
                            inner_user_score.create(user_score);
                        }
                    });
                    movie.save().then(() => { });
                });
            });
        });

        res.status(200).jsonp(user);
    });
}
module.exports = UserController; 