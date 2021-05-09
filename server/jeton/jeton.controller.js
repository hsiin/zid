const Jeton = require('./jeton.model');
const APIError = require('../helpers/APIError');
/**
 * Load Jeton and append to req.
 */
function load(req, res, next, id) {
  Jeton.get(id)
    .then((jeton) => {
      req.jeton = jeton; // eslint-disable-line no-param-reassign
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
  if (req.body.valeur) {
    q.valeur = req.body.valeur
  }
  if (req.body.createdAt) {
    q.createdAt = req.body.createdAt
  }
  let limit = 5
  let skip = (req.query.page - 1) * limit
  if(req.query.page == 0 || !req.query.page){
    Jeton.filter(q).then(jetons => res.json(jetons))
    .catch(e => next(e));
   }else
  Jeton.filter(q , { limit: limit, skip: skip })
    .then((jeton, err) => {
      if (err) {
        console.log(err)
      } else
        return res.json(jeton) // eslint-disable-line no-param-reassign

    })
    .catch(e => next(e));
}

/**
 * Get jeton
 * @returns {jeton}
 */
function get(req, res) {
  return res.json(req.jeton);
}

/**
 * Create new jeton
 * @property {string} req.body.nom - The nom of jeton.
 * @property {string} req.body.description - The description of jeton.
 * @property {string} req.body.valeur - The valeur of jeton.
 * @returns {Jeton}
 */
function create(req, res, next) {
  const jeton = new Jeton({
    nom: req.body.nom,
    description: req.body.description,
    valeur: req.body.valeur,


  });

  jeton.save()
    .then(savedJeton => {res.json(savedJeton)})
    .catch(() => {
      const err = new APIError('Jeton Error', 500, true)
      res.json(err)
    });
}

/**
 * Update existing jeton
 * @property {string} req.body.nom - The nom of jeton.
 * @property {string} req.body.description - The description of jeton.
 * @property {string} req.body.valeur - The valeur of jeton.
 * @returns {Jeton}
 */
function update(req, res, next) {
  const jeton = req.jeton;
  jeton.nom = req.body.nom;
  jeton.description = req.body.description;
  jeton.valeur = req.body.valeur

  jeton.save()
    .then(savedJeton => res.json(savedJeton))
    .catch(() => {
      const err = new APIError('Jeton Error', 500, true)
      res.json(err)
    });
}

/**
 * Get Jeton list.
 * @property {number} req.query.page
 * @returns {Jeton[]}
 */
 function list(req, res, next) {
 if(req.query.page == 0){
  Jeton.list().then(jetons => res.json(jetons))
  .catch(e => next(e));
 }else{
  let limit = 5
  let skip = (req.query.page - 1) * limit
  Jeton.list({ limit: limit, skip: skip })
    .then(jetons => res.json(jetons))
    .catch(e => next(e));
 }
}
/**
 * Delete Jeton.
 * @returns {Jeton}
 */
function remove(req, res, next) {
  const jeton = req.jeton;
  jeton.remove()
    .then(deletedJeton => res.json(deletedJeton))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove, filter };
