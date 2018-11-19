var in_array = require('in_array');
var Category = require("../models/category");
/* var Movie = require("../models/movie"); */
const categoryController = {};

categoryController.getOne =  (req, res) => {
    const { id } = req.params;
     Category.findById(id)
        .select('-__v')
        .populate('movies', 'name -_id')
        .then((category) => {
            if (category) {
                res.status(200).jsonp(category);
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
}

categoryController.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Category.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Category.find({ $or: [params] })
        .select('-__v')
        .populate('movies', 'name -_id')
        .then((categories) => {
            if (categories.length > 0) {
                res.status(200).jsonp(categories);
            } else {
                res.status(404).jsonp("Not found anyone");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

categoryController.update = (req, res) => {
    const { id } = req.params;
    Category.findByIdAndUpdate(
        id,
        req.body,
        { new: true },
    ).select('-__v')
        .populate('movies', 'name -_id')
        .then((category) => {
            if (category) {
                res.status(200).send({ message: 'Category successfuly updated!' });
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

categoryController.delete = (req, res) => {
    const { id } = req.params;
    Category.findByIdAndRemove(id)
        .populate('movies', 'name -_id')
        .then((category) => {
            if (category) {
                res.status(200).send({ message: 'Category successfuly deleted!' });
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

categoryController.create = (req, res) => {
    var category = new Category({
        name: req.body.name,
        movies: req.body.movies
    });
    category.save().then(() => {
        /*  var enhanced_gender = await Category.findById(enhanced_gender._id).select('-__v').populate('movies', 'name -_id');
         res.status(200).jsonp(enhanced_gender); */
        res.status(200).send({ message: 'Category successfuly created!' });
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

module.exports = categoryController; 