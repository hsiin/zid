const express = require('express');
const enchereCtrl = require('./enchere.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/encheres - Get list of encheres */
  .get(enchereCtrl.list)

  /** POST /api/encheres - Create new enchere */
  .post(enchereCtrl.create);

router.route('/affectClient/:enchereId')
  /** POST /api/test - Create new client */
  .put((req, res, next) => {
    enchereCtrl.affectClient(req, res, next)
  })

  router.route('/filter')
  /** GET /api/categorie/:categorieId - Get categorie */
  .post(enchereCtrl.filter)

router.route('/:enchereId')
  /** GET /api/encheres/:enchereId - Get enchere */
  .get(enchereCtrl.get)

  /** PUT /api/encheres/:enchereId - Update enchere */
  .put(enchereCtrl.update)

  /** DELETE /api/encheres/:enchereId - Delete enchere */
  .delete(enchereCtrl.remove);

/** Load enchere when API with enchereId route parameter is hit */
router.param('enchereId', enchereCtrl.load);

module.exports = router;
