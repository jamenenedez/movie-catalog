const express = require('express');
const router = express.Router();
const nationalityCtrl = require('../controllers/nationality.controller');
/* const jwtoken = require('../common/token'); */

router.get('/', nationalityCtrl.getAll);
router.get('/:id'/* , jwtoken.ensureToken */, nationalityCtrl.getOne);
router.post('/', nationalityCtrl.create);
router.put('/:id'/* , jwtoken.ensureToken */, nationalityCtrl.update);
router.delete('/:id'/* , jwtoken.ensureToken */, nationalityCtrl.delete);
module.exports = router;