var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var nationalitySchema = new Schema({
    name: { type: String },
    actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }],
    directors: [{ type: Schema.Types.ObjectId, ref: 'Director' }],
});

module.exports = mongoose.model('Nationality', nationalitySchema);