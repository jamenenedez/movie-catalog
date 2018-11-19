const express = require('express');
const router = express.Router();
const genderCtrl = require('../controllers/gender.controller');
/* const jwtoken = require('../common/token'); */

router.get('/', genderCtrl.getAll);
router.get('/:id'/* , jwtoken.ensureToken */, genderCtrl.getOne);
router.post('/', genderCtrl.create);
router.put('/:id'/* , jwtoken.ensureToken */, genderCtrl.update);
router.delete('/:id'/* , jwtoken.ensureToken */, genderCtrl.delete);
module.exports = router;