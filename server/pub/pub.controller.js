const Pub = require('./pub.model');
const multer = require('multer');
const upload = multer({ dest: '/uploads/' });



/**
 * Load Pub and append to req.
 */
function load(req, res, next, id) {
  Pub.get(id)
    .then((pub) => {
      req.pub = pub; // eslint-disable-line no-param-reassign
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
  if (req.body.dateDebut) {
    q.dateDebut = req.body.dateDebut
  }
  if (req.body.DateFin) {
    q.DateFin = req.body.DateFin
  }
  let limit = 5
  let skip = (req.query.page - 1) * limit
  if(req.query.page == 0 || !req.query.page){
    Pub.filter(q).then(pubs => res.json(pubs))
    .catch(e => next(e));
   }else
  Pub.filter(q , { limit: limit, skip: skip })
    .then((pub, err) => {
      if (err) {
        console.log(err)
      } else
        return res.json(pub) // eslint-disable-line no-param-reassign

    })
    .catch(e => next(e));
}
/**
 * Get pub
 * @returns {Pub}
 */
function get(req, res) {
  return res.json(req.pub);
}

/**
 * Create new test file
 * @property {string} req.body.path - The path image of fournisseur.
 * @returns {Pub}
 */
function create(req, res, next) {
  res.json(req.body.path)
}


/**
 * Create new pub
 * @property {string} req.body.nom - The name of pub.
 * @property {string} req.body.url - The name of pub.
 * @property {Date} req.body.dateDebut - The dateDebut of pub.
 * @property {Date} req.body.DateFin - The DateFin of pub.
 * @property {string} req.body.path - The path image of produit.
 * @returns {Pub}
 */
function savePub(req, res, next) {
  const pub = new Pub({
    nom: req.body.nom,
    url: req.body.url,
    dateDebut: req.body.dateDebut,
    DateFin: req.body.DateFin,
    path: req.body.path


  });

  pub.save()
    .then(savedPub => res.json(savedPub))
    .catch(e => next(e));
}

/**
 * Update existing pub
 * @property {string} req.body.nom - The name of pub.
 * @property {string} req.body.url - The name of pub.
 * @property {Date} req.body.dateDebut - The dateDebut of pub.
 * @property {Date} req.body.DateFin - The DateFin of pub.
 * @property {string} req.body.path - The path image of produit.
 * @returns {Pub}
 */
function update(req, res, next) {
  const pub = req.pub;
  pub.nom = req.body.nom;
  pub.url = req.body.url;
  pub.dateDebut = req.body.dateDebut;
  pub.DateFin = req.body.DateFin;
  pub.path = req.body.path;


  pub.save()
    .then(savedPub => res.json(savedPub))
    .catch(e => next(e));
}

/**
 * Get Pub list.
 * @property {number} req.query.page
 * @returns {Pub[]}
 */
 function list(req, res, next) {
  if(req.query.page == 0){
   Pub.list().then(pubs => res.json(pubs))
   .catch(e => next(e));
  }else{
   let limit = 5
   let skip = (req.query.page - 1) * limit
   Pub.list({ limit: limit, skip: skip })
     .then(pubs => res.json(pubs))
     .catch(e => next(e));
  }
 }

/**
 * Delete Pub.
 * @returns {Pub}
 */
function remove(req, res, next) {
  const pub = req.pub;
  pub.remove()
    .then(deletedPub => res.json(deletedPub))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove, savePub, filter };
