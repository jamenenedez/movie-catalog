var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: { type: String },
    category: { type: String, required: [true, 'A category must be named'] }, //Just one
    genders: { type: Array, required: [true, 'A gender must be named'] }, //At least one
    year: { type: String },
    country: { type: String },
    duration: { type: Number },
    score: { type: Number }, //User average qualifications  
    directors: { type: Array, required: [true, 'A director must be named'] }, //At least one
    actors: { type: Array, required: [true, 'An actor must be named'] },   //At least one
});

module.exports = mongoose.model('Movie', movieSchema);