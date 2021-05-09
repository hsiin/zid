const Categorie = require('./categorie.model');
const APIError = require('../helpers/APIError');

/**
 * Load Categorie and append to req.
 */
function load(req, res, next, id) {
  Categorie.get(id)
    .then((categorie) => {
      req.categorie = categorie; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get Categorie list.
 * @property {number} req.query.page - Number of categories to be skipped.
 */
function filter(req, res, next) {
  const q = {}
  if (req.body._id) {
    q._id = req.body._id
  }
  if (req.body.categorie) {
    q.categorie = { "$regex": req.body.categorie, "$options": "i" }
  }
  if (req.body.createdAt) {
    q.createdAt = req.body.createdAt
  }
  let limit = 5
  let skip = (req.query.page - 1) * limit
  if(req.query.page == 0 || !req.query.page){
    Categorie.filter(q).then(categories => res.json(categories))
    .catch(e => next(e));
   }else
  Categorie.filter(q , { limit: limit, skip: skip })
    .then((categorie, err) => {
      if (err) {
        console.log(err)
      } else
        return res.json(categorie) // eslint-disable-line no-param-reassign

    })
    .catch(e => next(e));
}

/**
 * Get categorie
 * @returns {Categorie}
 */
function get(req, res) {
  return res.json(req.categorie);
}

/**
 * Create new categorie
 * @property {string} req.body.categorie - The categorie of categorie.
 * @returns {Categorie}
 */
function create(req, res, next) {
  const categorie = new Categorie({
    categorie: req.body.categorie

  });

  categorie.save()
    .then(savedCategorie => {

      res.json(savedCategorie)
    }
    )
    .catch(() => {
      const err = new APIError('Categorie Error', 500, true)
      res.json(err)
    }



    );
}

/**
 * Update existing categorie
 * @property {string} req.body.categorie - The categorie of categorie.
 * @returns {Categorie}
 */
function update(req, res, next) {
  const categorie = req.categorie;
  categorie.categorie = req.body.categorie;

  categorie.save()
    .then(savedCategorie => res.json(savedCategorie))
    .catch(() => {
      const err = new APIError('Categorie Error', 500, true)
      res.json(err)
    });
}

/**
 * Get Categorie list.
 * @property {number} req.query.page - Number of categories to be skipped.
 * @returns {Categorie[]}
 */
function list(req, res, next) {
  // console.log(req.query.page)
 if(req.query.page == 0){
  Categorie.list().then(categories => res.json(categories))
  .catch(e => next(e));
 }else{
  let limit = 5
  let skip = (req.query.page - 1) * limit
  Categorie.list({ limit: limit, skip: skip })
    .then(categories => res.json(categories))
    .catch(e => next(e));
 }
}

/**
 * Delete Categorie.
 * @returns {Categorie}
 */
function remove(req, res, next) {
  const categorie = req.categorie;
  categorie.remove()
    .then(deletedCategorie => res.json(deletedCategorie))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove, filter };