var mongoose = require('mongoose');

const { Schema } = mongoose;

var categorySchema = new Schema({
    name: { type: String },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});

module.exports = mongoose.model('Category', categorySchema);