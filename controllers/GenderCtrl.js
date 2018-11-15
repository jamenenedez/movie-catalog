const mongoose = require('mongoose');
var in_array = require('in_array');
var Gender = require("../models/Gender");
var Movie = require("../models/Movie");
const GenderController = {};
var url = require('url');

GenderController.details = async (req, res, err) => {
    await Gender.findById(req.params.id).select('-__v').populate('movies', 'name -_id').then((gender) => {
        if (gender) {
            res.status(200).jsonp(gender);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

GenderController.list = async (req, res, err) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Gender.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    await Gender.find({ $or: [params] }).select('-__v').populate('movies', 'name -_id').then((genders) => {
        if (genders) {
            res.status(200).jsonp(genders);
        } else {
            res.status(404).jsonp("Not found anyone");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

GenderController.update = async (req, res, err) => {
    Gender.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },
    ).select('-__v').populate('movies', 'name -_id').then((gender) => {
        if (gender) {
            res.status(200).jsonp(gender);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

GenderController.delete = async (req, res, err) => {

    await Gender.findByIdAndRemove(req.params.id).populate('movies', 'name -_id').then((gender) => {
        if (gender) {
            res.status(200).jsonp(gender);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

GenderController.save = async (req, res, err) => {

    var gender = new Gender(req.body);
    await gender.save().then(async (enhanced_gender) => {
        var enhanced_gender = await Gender.findById(enhanced_gender._id).select('-__v').populate('movies', 'name -_id');
        res.status(200).jsonp(enhanced_gender);
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

module.exports = GenderController; 