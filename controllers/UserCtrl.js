'use strict'

const mongoose = require('mongoose');

var in_array = require('in_array');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var User = require("../models/User");
var Movie = require("../models/Movie");

const UserController = {};
var url = require('url');

UserController.details = async (req, res, err) => {
    await User.findById(req.params.id).select('-__v').populate('movies', 'name -_id').then((user) => {
        if (user) {
            res.status(200).jsonp(user);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

/* UserController.list = async (req, res, err) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(User.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    await User.find({ $or: [params] }).select('-__v').populate('movies', 'name -_id').then((users) => {
        if (users) {
            res.status(200).jsonp(users);
        } else {
            res.status(404).jsonp("Not found any");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}; */

UserController.update = async (req, res, err) => {
    User.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },
    ).select('-__v').populate('movies', 'name -_id').then((user) => {
        if (user) {
            res.status(200).jsonp(user);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

UserController.delete = async (req, res, err) => {

    await User.findByIdAndRemove(req.params.id).populate('movies', 'name -_id').then((user) => {
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
    await user.save().then(async (enhanced_gender) => {
        var enhanced_gender = await User.findById(enhanced_gender._id).select('-__v').populate('movies', 'name -_id');
        res.status(200).jsonp(enhanced_gender);
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

UserController.singUp = (req, res, err) => {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
            if (err) {
                res.status(500).json({
                    status: err
                });
            } else {
                const user = new User({
                    login: req.body.login,
                    email: req.body.email,
                    password: hash
                });
                await user.save();
                res.status(201).json({
                    status: 'Usuario guardado'
                });
            }
        });
    });
}

UserController.signIn = (req, res) => {
    User.findOne({ login: req.body.login }, function (err, user) {
        if (err) {
            res.status(500).json({
                status: err
            });
        } else if (user === null) {
            res.status(200).json({
                status: 'Usuario invalido'
            });
        } else {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        user
                    }, '6523e58bc0eec42c31b9635d5e0dfc23b6d119b73e633bf3a5284c79bb4a1ede');
                    res.status(200).json({
                        status: true,
                        menssage: 'Authenticated User',
                        token: token,
                        details: 'Correctly authenticated'
                    });
                } else {
                    res.status(403).json({
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
    jwt.verify(req.token, '6523e58bc0eec42c31b9635d5e0dfc23b6d119b73e633bf3a5284c79bb4a1ede', async (err, user) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            var params = {};
            for (key in req.query) {
                // check if the params are corrects for find
                if (in_array(key, Object.keys(User.schema.paths))) {
                    req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
                }
            }
            await User.find({ $or: [params] }).select('-__v').populate('movies', 'name -_id').then((users) => {
                if (users) {
                    res.status(200).jsonp(users);
                } else {
                    res.status(404).jsonp("Not found any");
                }
            }).catch((error) => {
                res.status(500).jsonp(error.message);
            });

            /* const users = await User.find();
            var list = new Array;
            users.forEach(function (user) {
                list.push({
                    id: user.id,
                    email: user.email,
                    url: '/api/usuario/' + user.id
                });
            });
            res.status(200).jsonp(list); */
        }
    });
}

/*usuariocontroller.edit = (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({ error: err });
        } else {
            if (data.usuario.rol === 'admin' || data.id === req.params.id) {
                const { id } = req.params;
                await usuario.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((result) => {
                    res.status(200).json({
                        status: 'Usuario actualizado'
                    }); 
                }).catch((err) => {
                    res.status(500).json({
                        status: 'Error interno',
                        error: err
                    });
                });
            } else {
                res.status(403).json({
                    error: 'Usuario no autorizado a realizar este cambio'
                });
            }
        }
    });
} */

module.exports = UserController; 