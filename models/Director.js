var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var directorSchema = new Schema({
    fullname: { type: String },
    nationality: { type: Schema.Types.ObjectId, ref: 'Nationality' },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});

module.exports = mongoose.model('Director', directorSchema);