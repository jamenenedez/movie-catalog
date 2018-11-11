var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer();

var Movie = require('../models/Movie');
var Actor = require('../models/Actor');
var Director = require('../models/Director');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Movies
var MovieCtrl = require('../controllers/MovieCtrl');
router.route('/movies').get(MovieCtrl.getMoviesByAttributes);
router.route('/movie/:id').get(MovieCtrl.getMovieByID);
router.route('/movie').post(upload.array(), MovieCtrl.saveMovie);
router.route('/movie/:id').put(MovieCtrl.updateMovie);
router.route('/movie/:id').delete(MovieCtrl.deleteMovie);

// Actor
var ActorCtrl = require('../controllers/ActorCtrl');
router.route('/actors').get(ActorCtrl.getActorsByAttributes);
router.route('/actor/:id').get(ActorCtrl.getActorByID);
router.route('/actor').post(upload.array(), ActorCtrl.saveActor);
router.route('/actor/:id').put(ActorCtrl.updateActor);
router.route('/actor/:id').delete(ActorCtrl.deleteActor);

// Actor
var DirectorCtrl = require('../controllers/DirectorCtrl');
router.route('/directors').get(DirectorCtrl.getDirectorsByAttributes);
router.route('/director/:id').get(DirectorCtrl.getDirectorByID);
router.route('/director').post(upload.array(), DirectorCtrl.saveDirector);
router.route('/director/:id').put(DirectorCtrl.updateDirector);
router.route('/director/:id').delete(DirectorCtrl.deleteDirector);

module.exports = router;