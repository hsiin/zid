const express = require('express');
const clientCtrl = require('./client.controller');

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
    .get(clientCtrl.list)
    .post(upload.single('path'), (req, res, next) => {
        req.body.path = req.file.path;
        clientCtrl.images(req, res, next)
    });
router.route('/saveFourni')
    .post((req, res, next) => {
        clientCtrl.create(req, res, next)

    })

router.route('/filter')
    .post(clientCtrl.filter)

router.route('/affectJeton/:clientId')
    .put((req, res, next) => {
        clientCtrl.affectJeton(req, res, next)
    });

router.route('/affectEnchere/:clientId')
    .put((req, res, next) => {
        clientCtrl.affectEnchere(req, res, next)
    })

router.route('/:clientId')
    .get(clientCtrl.get)
    .put(clientCtrl.update)
    .delete(clientCtrl.remove);

router.param('clientId', clientCtrl.load);

module.exports = router;
