var express = require('express');
var app = express();
var router = express.Router();

var multer = require('multer');
var upload = multer();
const jwtoken = require('../common/token');

var Movie = require('../models/Movie');
var Actor = require('../models/Actor');
var Director = require('../models/Director');
var Gender = require('../models/Gender');
var Category = require('../models/Category');
var User = require('../models/User');
var Nationality = require('../models/Nationality');
var Country = require('../models/Country');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Movies
var MovieCtrl = require('../controllers/MovieCtrl');
router.get('/movies', MovieCtrl.list);
router.get('/movies/:id', MovieCtrl.details);
router.post('/movies', upload.array(), MovieCtrl.save);
router.put('/movies/:id', MovieCtrl.update);
router.delete('/movies/:id', MovieCtrl.delete);

// Actor
var ActorCtrl = require('../controllers/ActorCtrl');
router.get('/actors', ActorCtrl.list);
router.get('/actors/:id', ActorCtrl.details);
router.post('/actors', upload.array(), ActorCtrl.save);
router.put('/actors/:id', ActorCtrl.update);
router.delete('/actors/:id', ActorCtrl.delete);

// Director
var DirectorCtrl = require('../controllers/DirectorCtrl');
router.get('/directors', DirectorCtrl.list);
router.get('/directors/:id', DirectorCtrl.details);
router.post('/directors', upload.array(), DirectorCtrl.save);
router.put('/directors/:id', DirectorCtrl.update);
router.delete('/directors/:id', DirectorCtrl.delete);

// Gender
var GenderCtrl = require('../controllers/GenderCtrl');
router.get('/genders', GenderCtrl.list);
router.get('/genders/:id', GenderCtrl.details);
router.post('/genders', upload.array(), GenderCtrl.save);
router.put('/genders/:id', GenderCtrl.update);
router.delete('/genders/:id', GenderCtrl.delete);

// Category
var CategoryCtrl = require('../controllers/CategoryCtrl');
router.get('/categories', CategoryCtrl.list);
router.get('/categories/:id', CategoryCtrl.details);
router.post('/categories', upload.array(), CategoryCtrl.save);
router.put('/categories/:id', CategoryCtrl.update);
router.delete('/categories/:id', CategoryCtrl.delete);

// User
var UserCtrl = require('../controllers/UserCtrl');
router.get('/users', jwtoken.ensureToken, UserCtrl.list)
router.get('/users/:id', jwtoken.ensureToken, UserCtrl.details);
router.post('/users', upload.array(), UserCtrl.save);
/* router.put('/users/:id', jwtoken.ensureToken, UserCtrl.update); */
router.put('/users/:id', jwtoken.ensureToken, UserCtrl.edit);
router.put('/users/:id/movies/:movie_id/scores', UserCtrl.qualifyMovies);
router.delete('/users/:id', jwtoken.ensureToken, UserCtrl.delete);
router.post('/users/signUp', UserCtrl.singUp);
router.post('/users/signIn', UserCtrl.signIn);

// Nationalities
var NationalityCtrl = require('../controllers/NationalityCtrl');
router.get('/nationalities', NationalityCtrl.list);
router.get('/nationalities/:id', NationalityCtrl.details);
router.post('/nationalities', upload.array(), NationalityCtrl.save);
router.put('/nationalities/:id', NationalityCtrl.update);
router.delete('/nationalities/:id', NationalityCtrl.delete);

// Country
var CountryCtrl = require('../controllers/CountryCtrl');
router.get('/countries', CountryCtrl.list);
router.get('/countries/:id', CountryCtrl.details);
router.post('/countries', upload.array(), CountryCtrl.save);
router.put('/countries/:id', CountryCtrl.update);
router.delete('/countries/:id', CountryCtrl.delete);

module.exports = router;