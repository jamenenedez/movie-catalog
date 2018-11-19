const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/category.controller');
/* const jwtoken = require('../common/token'); */

router.get('/', categoryCtrl.getAll);
router.get('/:id'/* , jwtoken.ensureToken */, categoryCtrl.getOne);
router.post('/', categoryCtrl.create);
router.put('/:id'/* , jwtoken.ensureToken */, categoryCtrl.update);
router.delete('/:id'/* , jwtoken.ensureToken */, categoryCtrl.delete);
module.exports = router;