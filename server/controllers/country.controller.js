var in_array = require('in_array');
var Country = require("../models/country");
/* var Movie = require("../models/movie"); */
const countryController = {};

countryController.getOne = (req, res) => {
    const { id } = req.params;
    Country.findById(id)
        .select('-__v')
        .populate('movies', 'name -_id')
        .then((country) => {
            if (country) {
                res.status(200).jsonp(country);
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
}

countryController.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Country.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Country.find({ $or: [params] })
        .select('-__v')
        .populate('movies', 'name -_id')
        .then((countries) => {
            if (countries.length > 0) {
                res.status(200).jsonp(countries);
            } else {
                res.status(404).jsonp("Not found anyone");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

countryController.update = (req, res) => {
    const { id } = req.params;
    Country.findByIdAndUpdate(
        id,
        req.body,
        { new: true },
    ).select('-__v')
        .populate('movies', 'name -_id')
        .then((country) => {
            if (country) {
                res.status(200).send({ message: 'Country successfuly updated!' });
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

countryController.delete = (req, res) => {
    const { id } = req.params;
    Country.findByIdAndRemove(req.params.id).populate('movies', 'name -_id').then((country) => {
        if (country) {
            res.status(200).send({ message: 'Country successfuly deleted!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

countryController.create = (req, res) => {
    var country = new Country({
        name: req.body.name,
        movies: req.body.movies
    });
    country.save().then(() => {
        res.status(200).send({ message: 'Country successfuly crated!' });
        /* var enhanced_country = await Country.findById(enhanced_country._id).select('-__v').populate('movies', 'name -_id');
        res.status(200).jsonp(enhanced_country); */
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

module.exports = countryController; 