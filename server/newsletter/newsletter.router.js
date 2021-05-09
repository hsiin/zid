const express = require('express');
const newsletterCtrl = require('./newsletter.controller');

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
  .get(newsletterCtrl.list)

  /** POST /api/gestuss - Create new gestus */
  .post(upload.single('path'), (req, res, next) => {
    req.body.path = req.file.path;
    newsletterCtrl.images(req, res, next)
  });
router.route('/saveNews')
  /** POST /api/test - Create new vainqueur */
  .post((req, res, next) => {
    newsletterCtrl.create(req, res, next)

  })

router.route('/filter')
  /** GET /api/categorie/:categorieId - Get categorie */
  .post(newsletterCtrl.filter)

router.route('/:newsletterId')
  /** GET /api/gestuss/:newsletterId - Get gestus */
  .get(newsletterCtrl.get)

  /** PUT /api/gestuss/:newsletterId - Update gestus */
  .put(newsletterCtrl.update)

  /** DELETE /api/gestuss/:newsletterId - Delete gestus */
  .delete(newsletterCtrl.remove);

/** Load gestus when API with newsletterId route parameter is hit */
router.param('newsletterId', newsletterCtrl.load);

module.exports = router;
