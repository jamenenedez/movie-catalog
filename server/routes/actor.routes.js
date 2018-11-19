const express = require('express');
const router = express.Router();
const actorCtrl = require('../controllers/actor.controller');
/* const jwtoken = require('../common/token'); */

router.get('/', actorCtrl.getAll);
router.get('/:id'/* , jwtoken.ensureToken */, actorCtrl.getOne);
router.post('/', actorCtrl.create);
router.put('/:id'/* , jwtoken.ensureToken */, actorCtrl.update);
router.delete('/:id'/* , jwtoken.ensureToken */, actorCtrl.delete);
module.exports = router;