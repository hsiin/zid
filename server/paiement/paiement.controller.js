const Paiement = require('./paiement.model');

/**
 * Load Paiement and append to req.
 */
function load(req, res, next, id) {
  Paiement.get(id)
    .then((paiement) => {
      req.paiement = paiement; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function filter(req, res, next) {
  const q = {}
  if (req.body._id) {
    q._id = req.body._id
  }
  if (req.body.ench_id) {
    q.ench_id = req.body.ench_id
  }
  if (req.body.pai) {
    q.pai = req.body.pai
  }
  if (req.body.createdAt) {
    q.createdAt = req.body.createdAt
  }
  if (req.body.etat) {
    q.etat = req.body.etat
  }
  if (req.body.Client_id) {
    q.Client_id = { "$regex": req.body.Client_id, "$options": "i" }
  }

  let limit = 5
  let skip = (req.query.page - 1) * limit
  if(req.query.page == 0 || !req.query.page){
    Paiement.filter(q).then(paiements => res.json(paiements))
    .catch(e => next(e));
   }else
  Paiement.filter(q , { limit: limit, skip: skip })
    .then((paiement, err) => {
      if (err) {
        console.log(err)
      } else
        return res.json(paiement) // eslint-disable-line no-param-reassign

    })
    .catch(e => next(e));
}

/**
 * Get paiement
 * @returns {Paiement}
 */
function get(req, res) {
  return res.json(req.paiement);
}

/**
 * Create new Paiement
 * @property {string} req.body.pai - The pai of Paiement.
 * @property {string} req.body.Client_id - The Client_id of Paiement.
 * @property {string} req.body.ench_id - The ench_id of Paiement.
 * @property {string} req.body.etat - The etat of Paiement.
 * @returns {Paiement}
 */
function create(req, res, next) {
  const paiement = new Paiement({
    pai: req.body.pai,
    Client_id: req.body.Client_id,
    ench_id: req.body.ench_id,
    etat: req.body.etat

  });

  paiement.save()
    .then(savedPaiement => res.json(savedPaiement))
    .catch(e => next(e));
}

/**
 * Get paimement list.
 * @property {number} req.query.page - Number of paimements to be skipped.
 * @returns {Paiement[]}
 */
 function list(req, res, next) {
  // console.log(req.query.page)
 if(req.query.page == 0){
  Paiement.list().then(paiements => res.json(paiements))
  .catch(e => next(e));
 }else{
  let limit = 5
  let skip = (req.query.page - 1) * limit
  Paiement.list({ limit: limit, skip: skip })
    .then(paiements => res.json(paiements))
    .catch(e => next(e));
 }
}

/**
 * Delete Paiement.
 * @returns {Paiement}
 */
function remove(req, res, next) {
  const paiement = req.paiement;
  paiement.remove()
    .then(deletedPaiement => res.json(deletedPaiement))
    .catch(e => next(e));
}

module.exports = { load, get, create, list, remove, filter };
