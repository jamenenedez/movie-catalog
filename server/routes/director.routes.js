const express = require('express');
const router = express.Router();
const directorCtrl = require('../controllers/director.controller');
/* const jwtoken = require('../common/token'); */

router.get('/', directorCtrl.getAll);
router.get('/:id'/* , jwtoken.ensureToken */, directorCtrl.getOne);
router.post('/', directorCtrl.create);
router.put('/:id'/* , jwtoken.ensureToken */, directorCtrl.update);
router.delete('/:id'/* , jwtoken.ensureToken */, directorCtrl.delete);
module.exports = router;