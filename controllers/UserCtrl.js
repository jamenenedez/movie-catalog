'use strict'

const mongoose = require('mongoose');

var in_array = require('in_array');
const service = require('../services');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var User = require("../models/User");
var Movie = require("../models/Movie");

const UserController = {};
var url = require('url');

UserController.singUp = async (req, res) => {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    });

    user.save((err) => {
        if (err) {
            return res.status(500).send({ message: 'Error while creating user: ${err}' });
        }
        return res.status(201).send({ token: service.createToken(user) });
    });
}

UserController.signIn = async (req, res) => {
    User.find({ email: req.body.email }, (error, user) => {
        if (error) {
            return res.status(500).send({ message: error });
        }
        else if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        req.user = user;
        res.status(200).send({
            message: "Successful login",
            token: service.createToken(user)
        });
    });
}

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

UserController.list = async (req, res, err) => {
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
};

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


/* usuariocontroller.singup = (req, res) => {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.contrasena, salt, async function (err, hash) {
            if (err) {
                res.status(500).json({
                    status: err
                });
            } else {
                const user = new usuario({
                    correo: req.body.correo,
                    contrasena: hash
                });
                await user.save();
                res.status(201).json({
                    status: 'Usuario guardado'
                });
            }
        });
    });
}

usuariocontroller.singin = (req, res) => {
    usuario.findOne({ correo: req.body.correo }, function (err, usuario) {
        if (err) {
            res.status(500).json({
                status: err
            });
        } else if(usuario === null) {
            res.status(200).json({
                status: 'Usuario invalido'
            });
        } else {
            bcrypt.compare(req.body.contrasena, usuario.contrasena, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        usuario
                    }, 'secret_key');
                    res.status(200).json({
                        status: true,
                        menssage: 'Usuario Autenticado',
                        token: token,
                        details: 'Usuario Autenticado Correctamente'
                    });
                } else {
                    res.status(403).json({
                        status: false,
                        menssage: 'Credenciales incorrectas',
                        token: '',
                        details: err
                    });
                }
            });
        }
    });
}

usuariocontroller.getList = (req, res) => {
    jwt.verify(req.token, 'secret_key', async (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            });
        } else {
            const usuarios = await usuario.find();
            var list = new Array;
            usuarios.forEach(function(element) {
                list.push({
                    id: element.id,
                    correo: element.correo,
                    rol: element.rol,
                    puntos: element.puntos,
                    url: '/api/usuario/' + element.id
                });
            });
            res.json(list);
        }
    });
}

usuariocontroller.edit = (req, res) => {
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