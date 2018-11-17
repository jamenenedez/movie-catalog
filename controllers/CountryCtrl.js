const mongoose = require('mongoose');
var in_array = require('in_array');
var Country = require("../models/Country");
var Movie = require("../models/Movie");
const CountryController = {};
var url = require('url');

CountryController.details = async (req, res, err) => {
    await Country.findById(req.params.id).select('-__v').populate('movies', 'name -_id').then((country) => {
        if (country) {
            res.status(200).jsonp(country);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

CountryController.list = async (req, res, err) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Country.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    await Country.find({ $or: [params] }).select('-__v').populate('movies', 'name -_id').then((countries) => {
        if (countries) {
            res.status(200).jsonp(countries);
        } else {
            res.status(404).jsonp("Not found anyone");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

CountryController.update = async (req, res, err) => {
    Country.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },
    ).select('-__v').populate('movies', 'name -_id').then((country) => {
        if (country) {
            res.status(200).jsonp(country);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

CountryController.delete = async (req, res, err) => {

    await Country.findByIdAndRemove(req.params.id).populate('movies', 'name -_id').then((country) => {
        if (country) {
            res.status(200).jsonp(country);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

CountryController.save = async (req, res, err) => {

    var country = new Country(req.body);
    await country.save().then(async (enhanced_country) => {
        var enhanced_country = await Country.findById(enhanced_country._id).select('-__v').populate('movies', 'name -_id');
        res.status(200).jsonp(enhanced_country);
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

module.exports = CountryController; 