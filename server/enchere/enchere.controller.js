const Enchere = require('./enchere.model');
const Client = require('../client/client.model');

/**
 * Load Enchere and append to req.
 */
function load(req, res, next, id) {
  Enchere.get(id)
    .then((enchere) => {
      req.enchere = enchere; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function filter(req, res, next) {
  const q = {}
  if (req.body._id) {
    q._id = req.body._id
  }
  if (req.body.produitId) {
    q.produitId = req.body.produitId
  }
  if (req.body.createdAt) {
    q.createdAt = req.body.createdAt
  }
  if (req.body.dateLancement) {
    q.dateLancement = req.body.dateLancement
  }
  if (req.body.prix) {
    q.prix = req.body.prix
  }
  if (req.body.nbminPar) {
    q.nbminPar = req.body.nbminPar
  }

  let limit = 5
  let skip = (req.query.page - 1) * limit
  if (req.query.page == 0 || !req.query.page) {
    Enchere.filter(q).then(encheres => res.json(encheres))
      .catch(e => next(e));
  } else
    Enchere.filter(q, { limit: limit, skip: skip })
      .then((enchere, err) => {
        if (err) {
          console.log(err)
        } else
          return res.json(enchere) // eslint-disable-line no-param-reassign

      })
      .catch(e => next(e));
}

/**
 * Get Enchere
 * @returns {Enchere}
 */
function get(req, res) {
  return res.json(req.enchere);
}

/**
 * Create new Enchere
 * @property {string} req.body.nom - The nom of Enchere.
 * @property {string} req.body.produitId - The produitId of Enchere.
 * @property {number} req.body.prix - The prix of Enchere.
 * @property {Number} req.body.valeur - The valeur of Enchere.
 * @property {Number} req.body.nbminPar - The nbminPar of Enchere.
 * @property {[{String}]} req.body.keywords - the tags of Enchere
 * @property {Date} req.body.dateLancement -the dateLancement of enchere
 * @returns {Enchere}
 */
function create(req, res, next) {
  console.log(req.body)
  const enchere = new Enchere({
    nom: req.body.nom,
    produitId: req.body.produitId,
    prix: req.body.prix,
    valeur: req.body.valeur,
    nbminPar: req.body.nbminPar,
    keywords: req.body.keywords,
    dateLancement: req.body.dateLancement
  });


  enchere.populate('produitId').execPopulate()
  // enchere.category.push(cat)
  enchere.save()

    .then(savedEnchere => {
      res.json(savedEnchere)
    })
    .catch(e => next(e));
}

/**
 * Update existing Enchere
 * @property {string} req.body.nom - The nom of Enchere.
 * @property {string} req.body.produitId - The produitId of Enchere.
 * @property {number} req.body.prix - The prix of Enchere.
 * @property {Number} req.body.valeur - The valeur of Enchere.
 * @property {Number} req.body.nbminPar - The nbminPar of Enchere.
 * @property {[{String}]} req.body.keywords - the tags of Enchere
 * @property {Date} req.body.dateLancement -the dateLancement of enchere
 * @returns {Enchere}
 */
function update(req, res, next) {
  const enchere = req.enchere;
  enchere.nom = req.body.nom;
  enchere.produitId = req.body.produitId
  enchere.prix = req.body.prix;
  enchere.valeur = req.body.valeur;
  enchere.nbminPar = req.body.nbminPar
  enchere.keywords = req.body.keywords
  enchere.dateLancement = req.body.dateLancement

  enchere.populate('produitId').execPopulate()
  enchere.save()
    .then(savedEnchere => res.json(savedEnchere))
    .catch(e => next(e));
}

/**
 * affect existing cleint to an existing enchere
 * @property {string} req.body.clientId - Jeton 
 * @property {string} req.body.ench_Id - The client of client.
 * @returns {Enchere}
 */
async function affectClient(req, res, next) {
  const e = await Enchere.findById({ _id: req.body.ench_Id })
  const c = await Client.findById({ _id: req.body.clientId })

  Enchere.update(
    { _id: e._id },
    { $push: { clientId: c } }
  ).exec()
  e.save()
    .then(savedEnchere => res.json(savedEnchere))
    .catch(e => next(e));
}

/**
 * Get Jeton list.
 * @property {number} req.query.page
 * @returns {Enchere[]}
 */
function list(req, res, next) {
  if (req.query.page == 0) {
    Enchere.list().then(encheres => res.json(encheres))
      .catch(e => next(e));
  } else {
    let limit = 5
    let skip = (req.query.page - 1) * limit
    Enchere.list({ limit: limit, skip: skip })
      .then(encheres => res.json(encheres))
      .catch(e => next(e));
  }
}

/**
 * Delete Enchere.
 * @returns {Enchere}
 */
function remove(req, res, next) {
  const enchere = req.enchere;
  enchere.remove()
    .then(deletedEnchere => res.json(deletedEnchere))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove, affectClient, filter };
