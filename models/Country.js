var mongoose = require('mongoose');

const { Schema } = mongoose;

var countrySchema = new Schema({
    name: { type: String },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});

module.exports = mongoose.model('Country', countrySchema);