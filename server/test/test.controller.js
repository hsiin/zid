const Test = require('./test.model');
const multer = require('multer');
const upload = multer({ dest: '/uploads/' });



/**
 * Load Test and append to req.
 */
function load(req, res, next, id) {
  Test.get(id)
    .then((test) => {
      req.test = test; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get test
 * @returns {Test}
 */
function get(req, res) {
  return res.json(req.test);
}

/**
 * Create new test file
 * @property {string} req.body.path - The path image of fournisseur.
 * @returns {Test}
 */
function create(req, res, next) {
  res.json(req.body.path)
}

/**
 * Create new test
 * @property {string} req.body.path - The path image of fournisseur.
 * @property {string} req.body.name
 * @property {string} req.body.lname
 * @returns {Test}
 */
function saveProduct(req, res, next) {
  const test = new Test({
    path: req.body.path,
    name: req.body.name,
    lname: req.body.lname

  });
  test.save().then(savedtest => res.json(savedtest))
}

/**
 * Update existing Fournisseur
 * @property {string} req.body.path - The path image of fournisseur.
 * @property {string} req.body.name
 * @property {string} req.body.lname
 * @returns {Test}
 */
function update(req, res, next) {
  const test = req.test;
  test.path = req.body.path;
  test.name = req.body.name;
  test.lname = req.body.lname;

  test.save()
    .then(savedtest => res.json(savedtest))
    .catch(e => next(e));
}

/**
 * Get Test list.
 * @property {number} req.query.skip - Number of Test to be skipped.
 * @property {number} req.query.limit - Limit number of Test to be returned.
 * @returns {Test[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Test.list({ limit, skip })
    .then(tests => res.json(tests))
    .catch(e => next(e));
}

/**
 * Delete Test.
 * @returns {Test}
 */
function remove(req, res, next) {
  const test = req.test;
  test.remove()
    .then(deletedtest => res.json(deletedtest))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove, saveProduct };
