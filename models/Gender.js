var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var genderSchema = new Schema({
    name: { type: String },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});

module.exports = mongoose.model('Gender', genderSchema);