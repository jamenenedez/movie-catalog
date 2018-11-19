'use strict'

var in_array = require('in_array');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config/config');

var User = require("../models/user");
var Movie = require("../models/movie");

const userController = {};

userController.getOne = async (req, res) => {
    const { id } = req.params;
    await User.findById(id).select('-__v -password')
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


userController.delete = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndRemove(id)
        .then((user) => {
            if (user) {
                res.status(200).send({ message: 'User successfuly deleted!' });
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

userController.create = (req, res) => {

    var user = new User({
        login: req.body.login,
        mail: req.body.mail,
        password: req.body.password
    });
    user.save().then(() => {
        res.status(200).send({ message: 'User successfuly created!' });
        /* var enhanced_user = await User.findById(enhanced_user._id).select('-__v -password')
            .populate({ path: 'scores.movie', populate: { path: 'movie' } });
        res.status(200).jsonp(enhanced_user); */
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

userController.singUp = (req, res) => {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
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

userController.signIn = (req, res) => {
    User.findOne({ login: req.body.login }, (err, user) => {
        if (err) {
            res.status(500).jsonp({ message: err });
        } else if (!user) {
            res.status(200).jsonp({ message: 'Invalid user' });
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

userController.getAll = (req, res) => {
    jwt.verify(req.token, config.SECRET_KEY, (err, user) => {
        if (err) {
            res.status(403).jsonp({ message: err });
        } else {
            var params = {};
            for (key in req.query) {
                // check if the params are corrects for find
                if (in_array(key, Object.keys(User.schema.paths))) {
                    req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
                }
            }
            User.find({ $or: [params] }).select('-__v -password')
                .populate({ path: 'scores.movie', populate: { path: 'movie' } })
                .then((user) => {
                    if (user.length > 0) {
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

userController.update = (req, res) => {
    jwt.verify(req.token, config.SECRET_KEY, async (err, data) => {
        if (err) {
            res.status(403).jsonp({ error: err });
        } else {
            if (data.user._id == req.params.id) {
                const { id } = req.params;
                User.findByIdAndUpdate(id, req.body, { new: true })
                    .then((user) => {
                        if (user) {
                            res.status(200).send({ message: 'User successfuly updated!' });
                        } else {
                            res.status(404).jsonp("Not found");
                        }
                    }).catch((error) => {
                        res.status(500).jsonp(error.message);
                    });
            } else {
                res.status(403).jsonp({
                    error: 'Non authorized user'
                });
            }
        }
    });
}

userController.qualifyMovies = async (req, res) => {

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
            user.scores.push({ movie: req.params.movie_id, score: req.body.score });
        }

        var updated_user = await user.save();

        if (updated_user) {
            var movie = await Movie.findById(req.params.movie_id).exec();
            var total_score = 0;
            if (movie != null) {
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
                movie.calification = total_score / movie.scores.length;
            }
            movie.save().then(() => {
                res.status(200).send({ message: 'Movie successfuly qualified!' });
            });
        }
    }
}
module.exports = userController; 