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
router.route('/movies').get(MovieCtrl.getMoviesByAttributes);
router.route('/movies/:id').get(MovieCtrl.getMovieByID);
router.route('/movies').post(upload.array(), MovieCtrl.saveMovie);
router.route('/movies/:id').put(MovieCtrl.updateMovie);
router.route('/movies/:id/scores').put(MovieCtrl.qualify);
router.route('/movies/:id').delete(MovieCtrl.deleteMovie);

// Actor
var ActorCtrl = require('../controllers/ActorCtrl');
router.route('/actors').get(ActorCtrl.getActorsByAttributes);
router.route('/actors/:id').get(ActorCtrl.getActorByID);
router.route('/actors').post(upload.array(), ActorCtrl.saveActor);
router.route('/actors/:id').put(ActorCtrl.updateActor);
router.route('/actors/:id').delete(ActorCtrl.deleteActor);

// Director
var DirectorCtrl = require('../controllers/DirectorCtrl');
router.route('/directors').get(DirectorCtrl.getDirectorsByAttributes);
router.route('/directors/:id').get(DirectorCtrl.getDirectorByID);
router.route('/directors').post(upload.array(), DirectorCtrl.saveDirector);
router.route('/directors/:id').put(DirectorCtrl.updateDirector);
router.route('/directors/:id').delete(DirectorCtrl.deleteDirector);

// Gender
var GenderCtrl = require('../controllers/GenderCtrl');
router.route('/genders').get(GenderCtrl.getGendersByAttributes);
router.route('/genders/:id').get(GenderCtrl.getGenderByID);
router.route('/genders').post(upload.array(), GenderCtrl.saveGender);
router.route('/genders/:id').put(GenderCtrl.updateGender);
router.route('/genders/:id').delete(GenderCtrl.deleteGender);

// Category
var CategoryCtrl = require('../controllers/CategoryCtrl');
router.route('/categories').get(CategoryCtrl.getCategorysByAttributes);
router.route('/categories/:id').get(CategoryCtrl.getCategoryByID);
router.route('/categories').post(upload.array(), CategoryCtrl.saveCategory);
router.route('/categories/:id').put(CategoryCtrl.updateCategory);
router.route('/categories/:id').delete(CategoryCtrl.deleteCategory);

// User
var UserCtrl = require('../controllers/UserCtrl');
router.route('/users').get(UserCtrl.getAllByAttributes);
router.route('/users/:id').get(UserCtrl.getByID);
router.route('/users').post(upload.array(), UserCtrl.save);
router.route('/users/:id').put(UserCtrl.update);
router.route('/users/:id').delete(UserCtrl.delete);

module.exports = router;