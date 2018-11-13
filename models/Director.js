var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var directorSchema = new Schema({
    fullname: { type: String },
    nationality: { type: String },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});

module.exports = mongoose.model('Director', directorSchema);