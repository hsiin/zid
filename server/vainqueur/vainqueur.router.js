const express = require('express');
const vainqueurCtrl = require('./vainqueur.controller');

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
    .get(vainqueurCtrl.list)
    .post(upload.single('path'), (req, res, next) => {
        req.body.path = req.file.path;
        vainqueurCtrl.images(req, res, next)
    });
router.route('/saveVainq')
    .post((req, res, next) => {
        vainqueurCtrl.create(req, res, next)

    })

router.route('/filter')
    .post(vainqueurCtrl.filter)

router.route('/:vainqueurId')
    .get(vainqueurCtrl.get)
    .delete(vainqueurCtrl.remove);

router.param('vainqueurId', vainqueurCtrl.load);

module.exports = router;
