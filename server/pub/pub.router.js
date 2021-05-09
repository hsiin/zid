const express = require('express');
const pubCtrl = require('./pub.controller');

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
  .get(pubCtrl.list)

  /** POST /api/gestuss - Create new gestus */
  .post(upload.single('path'), (req, res, next) => {
    req.body.path = req.file.path;
    pubCtrl.create(req, res, next)
  });

router.route('/savepub')
  /** POST /api/test - Create new gestus */
  .post((req, res, next) => {
    pubCtrl.savePub(req, res, next)

  })

router.route('/filter')
  /** GET /api/categorie/:categorieId - Get categorie */
  .post(pubCtrl.filter)

router.route('/:pubId')
  /** GET /api/gestuss/:pubId - Get gestus */
  .get(pubCtrl.get)

  /** PUT /api/gestuss/:pubId - Update gestus */
  .put(pubCtrl.update)

  /** DELETE /api/gestuss/:pubId - Delete gestus */
  .delete(pubCtrl.remove);

/** Load gestus when API with pubId route parameter is hit */
router.param('pubId', pubCtrl.load);

module.exports = router;
