const express = require('express');
// const validate = require('express-validation');
const expressJwt = require('express-jwt');
// const paramValidation = require('../../config/param-validation');
const authCtrl = require('./auth.controller');
// const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(authCtrl.login);
//logout user
router.get('/logout',async (req, res) => {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;
