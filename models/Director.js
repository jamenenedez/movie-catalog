var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var directorSchema = new Schema({
    fullname: { type: String },
    nationality: { type: String },
});

module.exports = mongoose.model('Director', directorSchema);