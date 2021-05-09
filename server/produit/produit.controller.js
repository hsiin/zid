const Produit = require('./produit.model');
const multer = require('multer');
const upload = multer({ dest: '/uploads/' });



/**
 * Load Produit and append to req.
 */
function load(req, res, next, id) {
  Produit.get(id)
    .then((produit) => {
      req.produit = produit; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function filter(req, res, next) {
  const q = {}
  if (req.body._id) {
    q._id = req.body._id
  }
  if (req.body.produit) {
    q.produit = { "$regex": req.body.produit, "$options": "i" }
  }
  if (req.body.cat) {
    q.cat = req.body.cat
  }
  if (req.body.createdAt) {
    q.createdAt = req.body.createdAt
  }
  if (req.body.prix) {
    q.prix = req.body.prix
  }
  if (req.body.fournisseur) {
    q.fournisseur = req.body.fournisseur
  }
  let limit = 5
  let skip = (req.query.page - 1) * limit
  if (req.query.page == 0 || !req.query.page) {
    Produit.filter(q).then(produits => res.json(produits))
      .catch(e => next(e));
  } else
    Produit.filter(q, { limit: limit, skip: skip })
      .then((produit, err) => {
        if (err) {
          console.log(err)
        } else
          return res.json(produit) // eslint-disable-line no-param-reassign

      })
      .catch(e => next(e));
}

/**
 * Get produit
 * @returns {Produit}
 */
function get(req, res) {
  return res.json(req.produit);
}

/**
 * Create new test file
 * @property {string} req.body.path - The path image of fournisseur.
 * @returns {Produit}
 */
function create(req, res, next) {
  res.json(req.body.path)
}

/**
 * Create new produit
 * @property {string} req.body.produit - The produit of produit.
 * @property {string} req.body.cat - The cat of produit.
 * @property {string} req.body.fournisseur - The fournisseur of produit.
 * @property {string} req.body.prix - The prix of produit.
 * @property {string} req.body.valcoup - The valcoup of produit.
 * @property {string} req.body.desc - The desc of produit.
 * @property {string} req.body.path - The path image of produit.
 * @returns {Produit}
 */
function saveProduct(req, res, next) {
  // res.json(req.body)
  const produit = new Produit({
    produit: req.body.produit,
    cat: req.body.cat,
    fournisseur: req.body.fournisseur,
    prix: req.body.prix,
    valcoup: req.body.valcoup,
    desc: req.body.desc,
    path: req.body.path


  });

  produit.save()
    .then(savedProduit => res.json(savedProduit))
    .catch(e => next(e));
}

/**
 * Update existing Produit
 * @property {string} req.body.produit - The produit of produit.
 * @property {string} req.body.cat - The cat of produit.
 * @property {string} req.body.fournisseur - The fournisseur of produit.
 * @property {string} req.body.prix - The prix of produit.
 * @property {string} req.body.valcoup - The valcoup of produit.
 * @property {string} req.body.desc - The desc of produit.
 * @property {string} req.body.path - The path image of produit.
 * @returns {Produit}
 */
function update(req, res, next) {
  const produit = req.produit;
  produit.produit = req.body.produit;
  produit.cat = req.body.cat;
  produit.fournisseur = req.body.fournisseur;
  produit.prix = req.body.prix;
  produit.valcoup = req.body.valcoup;
  produit.desc = req.body.desc;
  produit.path = req.body.path;


  produit.save()
    .then(savedProduit => res.json(savedProduit))
    .catch(e => next(e));
}

/**
 * Get Produit list.
 * @property {number} req.query.page
 * @returns {Produit[]}
 */
function list(req, res, next) {
  if (req.query.page == 0) {
    Produit.list().then(produits => res.json(produits))
      .catch(e => next(e));
  } else {
    let limit = 5
    let skip = (req.query.page - 1) * limit
    Produit.list({ limit: limit, skip: skip })
      .then(produits => res.json(produits))
      .catch(e => next(e));
  }
}

/**
 * Delete produit.
 * @returns {Produit}
 */
function remove(req, res, next) {
  const produit = req.produit;
  produit.remove()
    .then(deletedProduit => res.json(deletedProduit))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove, saveProduct, filter };
