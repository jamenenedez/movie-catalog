var express = require('express');
var app = express();
var router = express.Router();

var multer = require('multer');
var upload = multer();

var Movie = require('../models/Movie');
var Actor = require('../models/Actor');
var Director = require('../models/Director');
var Gender = require('../models/Gender');
var Category = require('../models/Category');
var User = require('../models/User');
var Nationality = require('../models/Nationality');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Movies
var MovieCtrl = require('../controllers/MovieCtrl');
router.get('/movies/search', MovieCtrl.list);
router.get('/movies/:id', MovieCtrl.details);
router.post('/movies', upload.array(), MovieCtrl.save);
router.put('/movies/:id', MovieCtrl.update);
/* router.route('/movies/:id/scores').put(MovieCtrl.qualify); */
router.delete('/movies/:id', MovieCtrl.delete);

// Actor
var ActorCtrl = require('../controllers/ActorCtrl');
router.get('/actors/search', ActorCtrl.list);
router.get('/actors/:id', ActorCtrl.details);
router.post('/actors', upload.array(), ActorCtrl.save);
router.put('/actors/:id', ActorCtrl.update);
router.delete('/actors/:id', ActorCtrl.delete);

// Director
var DirectorCtrl = require('../controllers/DirectorCtrl');
router.route('/directors/search').get(DirectorCtrl.list);
router.route('/directors/:id').get(DirectorCtrl.details);
router.route('/directors').post(upload.array(), DirectorCtrl.save);
router.route('/directors/:id').put(DirectorCtrl.update);
router.route('/directors/:id').delete(DirectorCtrl.delete);

// Gender
var GenderCtrl = require('../controllers/GenderCtrl');
router.route('/genders/search').get(GenderCtrl.list);
router.route('/genders/:id').get(GenderCtrl.details);
router.route('/genders').post(upload.array(), GenderCtrl.save);
router.route('/genders/:id').put(GenderCtrl.update);
router.route('/genders/:id').delete(GenderCtrl.delete);

// Category
var CategoryCtrl = require('../controllers/CategoryCtrl');
router.route('/categories/search').get(CategoryCtrl.list);
router.route('/categories/:id').get(CategoryCtrl.details);
router.route('/categories').post(upload.array(), CategoryCtrl.save);
router.route('/categories/:id').put(CategoryCtrl.update);
router.route('/categories/:id').delete(CategoryCtrl.delete);

// User
const jwtoken = require('../common/token');
var UserCtrl = require('../controllers/UserCtrl');
router.get('/users/search', jwtoken.ensureToken, UserCtrl.list)
/* router.route('/users/search').get(UserCtrl.list); */
router.route('/users/:id').get(UserCtrl.details);
router.route('/users').post(upload.array(), UserCtrl.save);
router.route('/users/:id').put(UserCtrl.update);
router.route('/users/:id').delete(UserCtrl.delete);
router.route('/users/signUp').post(UserCtrl.singUp);
router.route('/users/signIn').post(UserCtrl.signIn);

/* router.get('/', jwtoken.ensureToken, usuario.getList);
router.get('/:id', jwtoken.ensureToken, usuario.details);
router.put('/:id', jwtoken.ensureToken, usuario.edit);
router.delete('/:id', jwtoken.ensureToken, usuario.delete); */

// User
var NationalityCtrl = require('../controllers/NationalityCtrl');
router.route('/nationalities/search').get(NationalityCtrl.list);
router.route('/nationalities/:id').get(NationalityCtrl.details);
router.route('/nationalities').post(upload.array(), NationalityCtrl.save);
router.route('/nationalities/:id').put(NationalityCtrl.update);
router.route('/nationalities/:id').delete(NationalityCtrl.delete);

module.exports = router;