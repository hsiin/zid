const express = require('express');
const fournisseurCtrl = require('./fournisseur.controller');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/fournisseur - Get list of fournisseur */
  .get(fournisseurCtrl.list)



  /** POST /api/fournisseur - Create new fournisseur */
  .post(upload.single('path'), (req, res, next) => {
    req.body.path = req.file.path;
    fournisseurCtrl.create(req, res, next)
  });

router.route('/filter')
  /** GET /api/categorie/:categorieId - Get categorie */
  .post(fournisseurCtrl.filter)
  
router.route('/saveFourni')
  /** POST /api/test - Create new fournisseur */
  .post((req, res, next) => {
    fournisseurCtrl.SaveFourni(req, res, next)

  })

router.route('/:fournisseurId')
  /** GET /api/fournisseur/:fournisseurId - Get fournisseur */
  .get(fournisseurCtrl.get)

  /** PUT /api/fournisseur/:fournisseurId - Update fournisseur */
  .put(fournisseurCtrl.update)

  /** DELETE /api/fournisseur/:fournisseurId - Delete fournisseur */
  .delete(fournisseurCtrl.remove);

/** Load fournisseur when API with fournisseurId route parameter is hit */
router.param('fournisseurId', fournisseurCtrl.load);

module.exports = router;
