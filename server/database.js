const mongoose = require('mongoose');

const URI = 'mongodb+srv://jamenendez:Estudios-*2018@cluster0-7mf0l.mongodb.net/movie_catalog';

mongoose.connect(URI, { useNewUrlParser: true })
.then(db => console.log('DB conection successfuly'))
.catch(error => console.log(error));

module.exports = mongoose;