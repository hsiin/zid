const express = require('express');
const jetonCtrl = require('./jeton.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/jetons - Get list of jetons */
  .get(jetonCtrl.list)

  /** POST /api/jetons - Create new jeton */
  .post(jetonCtrl.create);

router.route('/filter')
  /** GET /api/categorie/:categorieId - Get categorie */
  .post(jetonCtrl.filter)

router.route('/:jetonId')
  /** GET /api/jetons/:jetonId - Get jeton */
  .get(jetonCtrl.get)

  /** PUT /api/jetons/:jetonId - Update jeton */
  .put(jetonCtrl.update)

  /** DELETE /api/jetons/:jetonId - Delete jeton */
  .delete(jetonCtrl.remove);

/** Load jeton when API with jetonId route parameter is hit */
router.param('jetonId', jetonCtrl.load);

module.exports = router;
