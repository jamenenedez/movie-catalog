var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer();

var Movie = require('../models/Movie');
var Actor = require('../models/Actor');
var Director = require('../models/Director');
var Gender = require('../models/Gender');
var Category = require('../models/Category');
var User = require('../models/User');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Movies
var MovieCtrl = require('../controllers/MovieCtrl');
router.route('/movies/search').get(MovieCtrl.getAllByAttributes);
router.route('/movies/:id').get(MovieCtrl.getByID);
router.route('/movies').post(upload.array(), MovieCtrl.save);
router.route('/movies/:id').put(MovieCtrl.update);
router.route('/movies/:id/scores').put(MovieCtrl.qualify);
router.route('/movies/:id').delete(MovieCtrl.delete);

// Actor
var ActorCtrl = require('../controllers/ActorCtrl');
router.route('/actors/search').get(ActorCtrl.getAllByAttributes);
router.route('/actors/:id').get(ActorCtrl.getByID);
router.route('/actors').post(upload.array(), ActorCtrl.save);
router.route('/actors/:id').put(ActorCtrl.update);
router.route('/actors/:id').delete(ActorCtrl.delete);

// Director
var DirectorCtrl = require('../controllers/DirectorCtrl');
router.route('/directors/search').get(DirectorCtrl.getAllByAttributes);
router.route('/directors/:id').get(DirectorCtrl.getByID);
router.route('/directors').post(upload.array(), DirectorCtrl.save);
router.route('/directors/:id').put(DirectorCtrl.update);
router.route('/directors/:id').delete(DirectorCtrl.delete);

// Gender
var GenderCtrl = require('../controllers/GenderCtrl');
router.route('/genders/search').get(GenderCtrl.getAllByAttributes);
router.route('/genders/:id').get(GenderCtrl.getByID);
router.route('/genders').post(upload.array(), GenderCtrl.save);
router.route('/genders/:id').put(GenderCtrl.update);
router.route('/genders/:id').delete(GenderCtrl.delete);

// Category
var CategoryCtrl = require('../controllers/CategoryCtrl');
router.route('/categories/search').get(CategoryCtrl.getAllByAttributes);
router.route('/categories/:id').get(CategoryCtrl.getByID);
router.route('/categories').post(upload.array(), CategoryCtrl.save);
router.route('/categories/:id').put(CategoryCtrl.update);
router.route('/categories/:id').delete(CategoryCtrl.delete);

// User
var UserCtrl = require('../controllers/UserCtrl');
router.route('/users/search').get(UserCtrl.getAllByAttributes);
router.route('/users/:id').get(UserCtrl.getByID);
router.route('/users').post(upload.array(), UserCtrl.save);
router.route('/users/:id').put(UserCtrl.update);
router.route('/users/:id').delete(UserCtrl.delete);

module.exports = router;