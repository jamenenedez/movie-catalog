const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const { mongoose } = require('./database');
//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:4200' }));

//Routes
//Robot actions
app.use('/api/actors', require('./routes/actor.routes'));
app.use('/api/directors', require('./routes/director.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/countries', require('./routes/country.routes'));
app.use('/api/genders', require('./routes/gender.routes'));
app.use('/api/nationalities', require('./routes/nationality.routes'));
app.use('/api/movies', require('./routes/movie.routes'));
app.use('/api/users', require('./routes/user.routes'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});