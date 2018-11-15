var mongoose = require('mongoose');

const { Schema } = mongoose;

var rankingSchema = new Schema({
    movie_id: { type: String },
    user_id: { type: String },
    score: {type: Number}
});

module.exports = mongoose.model('Ranking', rankingSchema);