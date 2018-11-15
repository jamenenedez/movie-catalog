const mongoose = require('mongoose');
var in_array = require('in_array');
var Category = require("../models/Category");
var Movie = require("../models/Movie");
const CategoryController = {};
var url = require('url');

CategoryController.details = async (req, res, err) => {
    await Category.findById(req.params.id).select('-__v').populate('movies', 'name -_id').then((category) => {
        if (category) {
            res.status(200).jsonp(category);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

CategoryController.list = async (req, res, err) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Category.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    await Category.find({ $or: [params] }).select('-__v').populate('movies', 'name -_id').then((categories) => {
        if (categories) {
            res.status(200).jsonp(categories);
        } else {
            res.status(404).jsonp("Not found anyone");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

CategoryController.update = async (req, res, err) => {
    Category.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },
    ).select('-__v').populate('movies', 'name -_id').then((category) => {
        if (category) {
            res.status(200).jsonp(category);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

CategoryController.delete = async (req, res, err) => {

    await Category.findByIdAndRemove(req.params.id).populate('movies', 'name -_id').then((category) => {
        if (category) {
            res.status(200).jsonp(category);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

CategoryController.save = async (req, res, err) => {

    var category = new Category(req.body);
    await category.save().then(async (enhanced_gender) => {
        var enhanced_gender = await Category.findById(enhanced_gender._id).select('-__v').populate('movies', 'name -_id');
        res.status(200).jsonp(enhanced_gender);
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

module.exports = CategoryController; 