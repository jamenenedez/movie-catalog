const mongoose = require('mongoose');
var in_array = require('in_array');
var Nationality = require("../models/Nationality");
var Actor = require("../models/Actor");
var Director = require("../models/Director");
const NationalityController = {};
var url = require('url');

NationalityController.getByID = async (req, res, err) => {
    await Nationality.findById(req.params.id). select('-__v').populate('actors directors', 'fullname -_id').then((nationality) => {
        if (nationality) {
            res.status(200).jsonp(nationality);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

NationalityController.getAllByAttributes = async (req, res, err) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Nationality.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    await Nationality.find({ $or: [params] }).select('-__v')./* populate('actors directors', 'name -_id'). */then((nationalities) => {
        if (nationalities) {
            res.status(200).jsonp(nationalities);
        } else {
            res.status(404).jsonp("Not found any");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

NationalityController.update = async (req, res, err) => {
    Nationality.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },
    ).select('-__v')/* .populate('actors directors', 'name -_id') */.then((actor) => {
        if (actor) {
            res.status(200).jsonp(actor);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

NationalityController.delete = async (req, res, err) => {

    await Nationality.findByIdAndRemove(req.params.id).select('-__v')/* .populate('actors directors', 'name -_id') */.then((nationality) => {
        if (nationality) {
            res.status(200).jsonp(nationality);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

NationalityController.save = async (req, res, err) => {

    var nationality = new Nationality(req.body);
    await nationality.save().then(async () => {        
        var enhanced_nationality = await Nationality.findById(nationality._id).select('-__v')/* .populate('actors directors', 'name -_id') */;
        res.status(200).jsonp(enhanced_nationality);
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

module.exports = NationalityController; 