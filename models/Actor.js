var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var actorSchema = new Schema({
    fullname: { type: String },
    nationality: { type: Schema.Types.ObjectId, ref: 'Nacionality' },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});

module.exports = mongoose.model('Actor', actorSchema);