const Newsletter = require('./newsletter.model');
const multer = require('multer');
const upload = multer({ dest: '/uploads/' });

/**
 * Load Newsletter and append to req.
 */
function load(req, res, next, id) {
  Newsletter.get(id)
    .then((newsletter) => {
      req.newsletter = newsletter; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function filter(req, res, next) {
  const q = {}
  if (req.body._id) {
    q._id = req.body._id
  }
  if (req.body.desc) {
    q.desc = { "$regex": req.body.desc, "$options": "i" }
  }

  let limit = 5
  let skip = (req.query.page - 1) * limit
  if(req.query.page == 0 || !req.query.page){
    Newsletter.filter(q).then(newsletters => res.json(newsletters))
    .catch(e => next(e));
   }else
  Newsletter.filter(q , { limit: limit, skip: skip })
    .then((newsletter, err) => {
      if (err) {
        console.log(err)
      } else
        return res.json(newsletter) // eslint-disable-line no-param-reassign

    })
    .catch(e => next(e));
}

/**
 * Get Newsletter
 * @returns {Newsletter}
 */
function get(req, res) {
  return res.json(req.newsletter);
}

/**
 * images new path file
 * @property {string} req.body.path - The path image of fournisseur.
 * @returns {Newsletter}
 */
function images(req, res, next) {
  res.json(req.body.path)
}

/**
 * Create new newsletter
 * @property {string} req.body.desc - The nom of newsletter.
 * @property {string} req.body.path - The client of newsletter.
 * @returns {Newsletter}
 */
function create(req, res, next) {
  // res.json(req.body)
  const newsletter = new Newsletter({
    desc: req.body.desc,
    path: req.body.path
  });

  newsletter.save()
    .then(savedNewsletter => res.json(savedNewsletter))
    .catch(e => next(e));
}

/**
 * Update existing Newsletter
 * @property {string} req.body.desc - The nom of Newsletter.
 * @property {string} req.body.path - The path image of Newsletter.
 * @returns {Newsletter}
 */
function update(req, res, next) {
  const newsletter = req.newsletter;
  newsletter.desc = req.body.desc;
  newsletter.path = req.body.path;

  newsletter.save()
    .then(savedNewsletter => res.json(savedNewsletter))
    .catch(e => next(e));
}

/**
 * Get Newsletter list.
 * @property {number} req.query.page - Number of Newsletters to be skipped.
 * @returns {Newsletter[]}
 */
 function list(req, res, next) {
  // console.log(req.query.page)
 if(req.query.page == 0){
  Newsletter.list().then(newsletters => res.json(newsletters))
  .catch(e => next(e));
 }else{
  let limit = 5
  let skip = (req.query.page - 1) * limit
  Newsletter.list({ limit: limit, skip: skip })
    .then(newsletters => res.json(newsletters))
    .catch(e => next(e));
 }
}

/**
 * Delete Newsletter.
 * @returns {Newsletter}
 */
function remove(req, res, next) {
  const newsletter = req.newsletter;
  newsletter.remove()
    .then(deletedNewsletter => res.json(deletedNewsletter))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove, images, filter };
