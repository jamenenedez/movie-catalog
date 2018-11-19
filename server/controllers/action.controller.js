const actionCtrl = {};
const Action = require('../models/action');
var in_array = require('in_array');

actionCtrl.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Action.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Action.find({ $or: [params] }).select('-__v').then((actions) => {
        if (actions.length > 0) {
            res.status(200).jsonp(actions);
        } else {
            res.status(404).jsonp("Not found anyone");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

actionCtrl.getOne = (req, res) => {
    const { id } = req.params;
    Action.findById(id).select('-__v').then((action) => {
        if (action) {
            res.status(200).jsonp(action);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

actionCtrl.create = (req, res) => {
    const action = new Action(req.body);
    action.save().then(() => {
        res.status(200).send({ message: 'Action successfuly created!' });
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

actionCtrl.update = async (req, res) => {
    const { id } = req.params;
    await Action.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((action) => {
        if (action) {
            res.status(200).send({ message: 'Action successfuly updated!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

actionCtrl.delete = (req, res) => {
    const { id } = req.params;
    Action.findByIdAndDelete(id).then((action) => {
        if (action) {
            res.status(200).send({ message: 'Action successfuly deleted!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}
module.exports = actionCtrl;