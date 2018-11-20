var in_array = require('in_array');
var Gender = require("../models/gender");
/* var Movie = require("../models/movie"); */
const genderController = {};

genderController.getOne = (req, res) => {
    const { id } = req.params;
    Gender.findById(id)
        .select('-__v')
        .populate('movies', 'name -_id')
        .then((gender) => {
            if (gender) {
                res.status(200).jsonp(gender);
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
}

genderController.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Gender.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Gender.find({ $or: [params] })
        .select('-__v')
        .populate('movies', 'name -_id')
        .then((genders) => {
            if (genders.length > 0) {
                res.status(200).jsonp(genders);
            } else {
                res.status(404).jsonp("Not found anyone");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

genderController.update = (req, res) => {
    const { id } = req.params;
    Gender.findByIdAndUpdate(
        id,
        req.body,
        { new: true },
    ).select('-__v')
        .populate('movies', 'name')
        .then((gender) => {
            if (gender) {
                res.status(200).send({ message: 'Gender successfuly updated!' });
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

genderController.delete = (req, res) => {
    const { id } = req.params;
    Gender.findByIdAndRemove(id)
        .then((gender) => {
            if (gender) {
                res.status(200).send({ message: 'Gender successfuly deleted!' });
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

genderController.create = (req, res) => {

    var gender = new Gender({
        name: req.body.name,
        movies: req.body.movies
    });
    gender.save().then(() => {
        res.status(200).send({ message: 'Gender successfuly created!' });
        /*  var enhanced_gender = await Gender.findById(enhanced_gender._id).select('-__v').populate('movies', 'name -_id');
         res.status(200).jsonp(enhanced_gender); */
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

module.exports = genderController; 