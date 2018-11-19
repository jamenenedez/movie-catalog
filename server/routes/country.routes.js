const express = require('express');
const router = express.Router();
const countryCtrl = require('../controllers/country.controller');
/* const jwtoken = require('../common/token'); */

router.get('/', countryCtrl.getAll);
router.get('/:id'/* , jwtoken.ensureToken */, countryCtrl.getOne);
router.post('/', countryCtrl.create);
router.put('/:id'/* , jwtoken.ensureToken */, countryCtrl.update);
router.delete('/:id'/* , jwtoken.ensureToken */, countryCtrl.delete);
module.exports = router;