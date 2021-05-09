const express = require('express');
const testCtrl = require('./test.controller');
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
const router = express.Router();

router.route('/')
  /** GET /api/test - Get list of test */
  .get(testCtrl.list)
  
  /** POST /api/test - Create new gestus */
  .post(upload.single('path'), (req, res, next) => {
    req.body.path = req.file.path;
    testCtrl.create(req, res, next)
  });

router.route('/save')
  /** POST /api/test - Create new gestus */
  .post((req, res, next) => {
    testCtrl.saveProduct(req, res, next)

  })

router.route('/:testId')
  /** GET /api/gestuss/:testId - Get gestus */
  .get(testCtrl.get)

  /** PUT /api/gestuss/:testId - Update gestus */
  .put(testCtrl.update)

  /** DELETE /api/gestuss/:testId - Delete gestus */
  .delete(testCtrl.remove);

/** Load gestus when API with testId route parameter is hit */
router.param('testId', testCtrl.load);

module.exports = router;
