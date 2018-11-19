const express = require('express');
const router = express.Router();
const movieCtrl = require('../controllers/movie.controller');
/* const jwtoken = require('../common/token'); */

router.get('/', movieCtrl.getAll);
router.get('/:id'/* , jwtoken.ensureToken */, movieCtrl.getOne);
router.post('/', movieCtrl.create);
router.put('/:id'/* , jwtoken.ensureToken */, movieCtrl.update);
router.delete('/:id'/* , jwtoken.ensureToken */, movieCtrl.delete);
module.exports = router;