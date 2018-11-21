var in_array = require('in_array');
var Nationality = require("../models/nationality");
/* var Actor = require("../models/nationality");
var Director = require("../models/director"); */
const nationalityController = {};

nationalityController.getOne = (req, res) => {
    const { id } = req.params;
    Nationality.findById(id)
        .select('-__v')
        .populate('actors directors', 'fullname')
        .then((nationality) => {
            if (nationality) {
                res.status(200).jsonp(nationality);
            } else {
                res.status(404).jsonp("Not found");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
}

nationalityController.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Nationality.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Nationality.find({ $or: [params] })
        .select('-__v')
        .populate('actors directors', 'fullname')
        .then((nationalities) => {
            if (nationalities.length > 0) {
                res.status(200).jsonp(nationalities);
            } else {
                res.status(404).jsonp("Not found anyone");
            }
        }).catch((error) => {
            res.status(500).jsonp(error.message);
        });
};

nationalityController.update = (req, res) => {
    const { id } = req.params;
    Nationality.findByIdAndUpdate(
        id,
        req.body,
        { new: true },
    ).then((nationality) => {
        if (nationality) {
            res.status(200).send({ message: 'Nationality successfuly updated!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

nationalityController.delete = (req, res) => {
    const { id } = req.params;
    Nationality.findByIdAndRemove(id).then((nationality) => {
        if (nationality) {
            res.status(200).send({ message: 'Nationality successfuly deleted!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

nationalityController.create = (req, res) => {
    var nationality = new Nationality({
        name: req.body.name,
        actors: req.body.actors,
        directors: req.body.directors,
    });
    nationality.save().then(() => {
        res.status(200).send({ message: 'Nationality successfuly created!' });
        /*  var enhanced_nationality = await Nationality.findById(nationality._id).select('-__v').populate('actors directors', 'fullname -_id');
         res.status(200).jsonp(enhanced_nationality); */
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
};

module.exports = nationalityController; 