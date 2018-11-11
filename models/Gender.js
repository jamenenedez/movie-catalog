var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var genderSchema = new Schema({
    name: { type: String }
});

module.exports = mongoose.model('Gender', genderSchema);