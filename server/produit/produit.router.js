const express = require('express');
const produitCtrl = require('./produit.controller');
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
  /** GET /api/gestuss - Get list of gestuss */
  .get(produitCtrl.list)

  /** POST /api/gestuss - Create new gestus */
  .post(upload.single('path'), (req, res, next) => {
    req.body.path = req.file.path;
    produitCtrl.create(req, res, next)
  });

router.route('/filter')
  /** GET /api/categorie/:categorieId - Get categorie */
  .post(produitCtrl.filter)

router.route('/saveProduct')
  /** POST /api/test - Create new gestus */
  .post((req, res, next) => {
    produitCtrl.saveProduct(req, res, next)
  })

router.route('/:produitId')
  /** GET /api/gestuss/:produitId - Get gestus */
  .get(produitCtrl.get)

  /** PUT /api/gestuss/:produitId - Update gestus */
  .put(produitCtrl.update)

  /** DELETE /api/gestuss/:produitId - Delete gestus */
  .delete(produitCtrl.remove);

/** Load gestus when API with produitId route parameter is hit */
router.param('produitId', produitCtrl.load);

module.exports = router;
