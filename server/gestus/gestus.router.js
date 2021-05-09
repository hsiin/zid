const express = require('express');
const gestusCtrl = require('./gestus.controller');
const multer = require('multer');
const upload = multer({ dest: '/uploads/' });
const router = express.Router();

router.route('/')
  .get(gestusCtrl.list)
  .post(gestusCtrl.create);

router.route('/filter')
  .post(gestusCtrl.filter)

router.route('/:gestusId')
  .get(gestusCtrl.get)
  .put(gestusCtrl.update)
  .delete(gestusCtrl.remove);

router.param('gestusId', gestusCtrl.load);

module.exports = router;
