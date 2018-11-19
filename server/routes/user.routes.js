const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const jwtoken = require('../commons/token');

router.get('/', jwtoken.ensureToken, userCtrl.getAll);
router.get('/:id', jwtoken.ensureToken, userCtrl.getOne);
router.post('/', userCtrl.create);
router.put('/:id', jwtoken.ensureToken, userCtrl.update);
router.delete('/:id', jwtoken.ensureToken, userCtrl.delete);
router.put('/:id/movies/:movie_id/scores', userCtrl.qualifyMovies);
router.post('/signUp', userCtrl.singUp);
router.post('/signIn', userCtrl.signIn);
module.exports = router;