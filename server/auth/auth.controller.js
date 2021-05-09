const jwt = require('jsonwebtoken');
const User = require('../gestus/gestus.model');
/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function login(req, res, next) {


  // email dosn't exist
  const client = await User.findOne({ email: req.body.Email });
  if (!client) return res.status(400).send("email  doesn't exists");

  if (req.body.password == client.mdp) {
    //create the token 
    const token = jwt.sign({ _id: client._id }, "qsd");
    response = {
      token:token
    }
    // res.header("auth-token",token).send(token);
    res.status(200).json(response);
    console.log(" connected  :", client.nom,);
  } else {
    return res.status(400).send("Invalide password");
  }



}

module.exports = { login };
