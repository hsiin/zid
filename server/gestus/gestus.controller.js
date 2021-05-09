const Gestus = require('./gestus.model');
const multer = require('multer');
const upload = multer({ dest: '/uploads/' });



/**
 * Load Gestus and append to req.
 */
function load(req, res, next, id) {
  Gestus.get(id)
    .then((gestus) => {
      req.gestus = gestus; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function filter(req, res, next) {
  const q = {}
  if (req.body._id) {
    q._id = req.body._id
  }
  if (req.body.nom) {
    q.nom = { "$regex": req.body.nom, "$options": "i" }
  }
  if (req.body.email) {
    q.email = req.body.email
  }
  Gestus.find(q)
    .then((gestus, err) => {
      if (err) {
        console.log(err)
      } else
        return res.json(gestus) // eslint-disable-line no-param-reassign

    })
    .catch(e => next(e));
}

/**
 * Get gestus
 * @returns {Gestus}
 */
function get(req, res) {
  return res.json(req.gestus);
}

/**
 * Create new gestus
 * @property {string} req.body.nom - The nom of gestus.
 *  @property {[{Object}]} req.body.access
 * @property {string} req.body.email - The client of gestus.
 * @property {string} req.body.mdp - The enchere of gestus.
 * @returns {Gestus}
 */
function create(req, res, next) {
  // res.json(req.body)
  const gestus = new Gestus({
    nom: req.body.nom,
    email: req.body.email,
    mdp: req.body.mdp,
    access: req.body.access


  });

  gestus.save()
    .then(savedGestus => res.json(savedGestus))
    .catch(e => next(e));
}

/**
 * Update existing gestus
 * @property {string} req.body.nom - The nom of gestus.
 * @property {[{Object}]} req.body.access
 * @property {string} req.body.email - The client of gestus.
 * @property {string} req.body.mdp - The enchere of gestus.
 * @returns {Gestus}
 */
function update(req, res, next) {
  const gestus = req.gestus;
  gestus.nom = req.body.nom;
  gestus.email = req.body.email;
  gestus.mdp = req.body.mdp;
  gestus.access = req.body.access

  gestus.save()
    .then(savedGestus => res.json(savedGestus))
    .catch(e => next(e));
}

/**
 * Get Gestus list.
 * @returns {Gestus[]}
 */
function list(req, res, next) {
  Gestus.list()
    .then(gestuss => res.json(gestuss))
    .catch(e => next(e));
}

/**
 * Delete Gestus.
 * @returns {Gestus}
 */
function remove(req, res, next) {
  const gestus = req.gestus;
  gestus.remove()
    .then(deletedGestus => res.json(deletedGestus))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove, filter };
