const Fournisseur = require('./fournisseur.model');
const multer = require('multer');
const upload = multer({ dest: '/uploads/' });



/**
 * Load Fournisseur and append to req.
 */
function load(req, res, next, id) {
  Fournisseur.get(id)
    .then((fournisseur) => {
      req.fournisseur = fournisseur; // eslint-disable-line no-param-reassign
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
  if (req.body.createdAt) {
    q.createdAt = req.body.createdAt
  }
  let limit = 5
  let skip = (req.query.page - 1) * limit
  if (req.query.page == 0 || !req.query.page) {
    Fournisseur.filter(q).then(fournisseurs => res.json(fournisseurs))
      .catch(e => next(e));
  } else
    Fournisseur.filter(q, { limit: limit, skip: skip })
      .then((fournisseur, err) => {
        if (err) {
          console.log(err)
        } else
          return res.json(fournisseur) // eslint-disable-line no-param-reassign

      })
      .catch(e => next(e));
}

/**
 * Get fournisseur
 * @returns {Fournisseur}
 */
function get(req, res) {
  return res.json(req.fournisseur);
}

/**
 * Create new test file
 * @property {string} req.body.path - The path image of fournisseur.
 * @returns {Fournisseur}
 */
function create(req, res, next) {
  res.json(req.body.path)
}


/**
 * Create new fournisseur
 * @property {string} req.body.nom - The nom of fournisseur.
 * @property {string} req.body.site - The client of fournisseur.
 * @property {string} req.body.path - The path image of fournisseur.
 * @returns {Fournisseur}
 */
function SaveFourni(req, res, next) {
  const fournisseur = new Fournisseur({
    nom: req.body.nom,
    site: req.body.site,
    path: req.body.path


  });

  fournisseur.save()
    .then(savedFournisseur => res.json(savedFournisseur))
    .catch(e => next(e));
}

/**
 * Update existing Fournisseur
 * @property {string} req.body.nom - The nom of fournisseur.
 * @property {string} req.body.site - The site of fournisseur.
 * @property {string} req.body.path - The path image of fournisseur.
 * @returns {Fournisseur}
 */
function update(req, res, next) {
  const fournisseur = req.fournisseur;
  fournisseur.nom = req.body.nom;
  fournisseur.site = req.body.site;
  fournisseur.path = req.body.path;

  fournisseur.save()
    .then(savedFournisseur => res.json(savedFournisseur))
    .catch(e => next(e));
}
/**
 * Get Fournisseur list.
 * @property {number} req.query.page
 * @returns {Fournisseur[]}
 */
function list(req, res, next) {
  if (req.query.page == 0) {
    Fournisseur.list().then(fournisseurs => res.json(fournisseurs))
      .catch(e => next(e));
  } else {
    let limit = 5
    let skip = (req.query.page - 1) * limit
    Fournisseur.list({ limit: limit, skip: skip })
      .then(fournisseurs => res.json(fournisseurs))
      .catch(e => next(e));
  }
}

/**
 * Delete Fournisseur.
 * @returns {Fournisseur}
 */
function remove(req, res, next) {
  const fournisseur = req.fournisseur;
  fournisseur.remove()
    .then(deletedFournisseur => res.json(deletedFournisseur))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove, SaveFourni, filter };
