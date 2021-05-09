const express = require('express');
const paiementCtrl = require('./paiement.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(paiementCtrl.list)
  .post(paiementCtrl.create);

router.route('/filter')
  .post(paiementCtrl.filter)

router.route('/:paiementId')
  .get(paiementCtrl.get)
  .delete(paiementCtrl.remove);

router.param('paiementId', paiementCtrl.load);

module.exports = router;
