const express = require('express');
const categorieCtrl = require('./categorie.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/categories - Get list of categories */
  .get(categorieCtrl.list)

  /** POST /api/categories - Create new categorie */
  .post(categorieCtrl.create);

router.route('/filter')
  /** GET /api/categorie/:categorieId - Get categorie */
  .post(categorieCtrl.filter)

router.route('/:categorieId')
  /** GET /api/categorie/:categorieId - Get categorie */
  .get(categorieCtrl.get)



  /** PUT /api/categorie/:categorieId - Update categorie */
  .put(categorieCtrl.update)

  /** DELETE /api/categorie/:categorieId - Delete categorie */
  .delete(categorieCtrl.remove);

/** Load categorie when API with categorieId route parameter is hit */
router.param('categorieId', categorieCtrl.load);

module.exports = router;
