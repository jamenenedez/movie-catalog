var mongoose = require('mongoose');
var in_array = require('in_array');
var Category = mongoose.model('Category');
var url = require('url');

exports.getCategoryByID = function (req, res, err) {
    Category.findById(req.params.id, function (err, category) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(category);
        }
    });
};

exports.getCategorysByAttributes = function (req, res, err) {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Category.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Category.find({ $or: [params] }, function (err, categorys) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(categorys);
        }
    });
};

exports.updateCategory = function (req, res, err) {
    Category.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, category) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(category);
        }
    );
};

exports.deleteCategory = function (req, res, err) {
    Category.findById(req.params.id, function (err, category) {
        if (err) {
            res.send(503, err.message);
        } else {
            if (!category) {
                res.status(404).send();
            } else {
                category.remove(function (err, removedCategory) {
                    if (err) {
                        res.send(503, err.message);
                    } else {
                        res.send(removedCategory);
                    }
                });
            }
        }
    });
};

exports.saveCategory = function (req, res, err) {
    var category = new Category(req.body);

    category.save(req.body, function (err, category) {
        if (err) {
            res.send(503, err.message);
        } else {
            res.status(200).jsonp(category);
        }
    });
};