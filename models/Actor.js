var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var actorSchema = new Schema({
    fullname: { type: String },
    nationality: { type: String }
});

module.exports = mongoose.model('Actor', actorSchema);