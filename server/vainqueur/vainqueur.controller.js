const Vainqueur = require('./vainqueur.model')
const Client = require('../client/client.model');
const Enchere = require('../enchere/enchere.model')

/**
 * Load Vainqueur and append to req.
 */
function load(req, res, next, id) {
    Vainqueur.get(id)
        .then((vainqueur) => {
            req.vainqueur = vainqueur; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

function filter(req, res, next) {
    const q = {}
    if (req.body._id) {
        q._id = req.body._id
    }
    if (req.body.ench_Id) {
        q.ench_Id = req.body.ench_Id
    }
    if (req.body.clientId) {
        q.clientId = req.body.clientId
    }
    Vainqueur.filter(q)
        .then((vainqueur, err) => {
            if (err) {
                console.log(err)
            } else
                return res.json(vainqueur)

        })
        .catch(e => next(e));
}

/**
 * Get Vainqueur
 * @returns {Vainqueur}
 */
function get(req, res) {
    return res.json(req.vainqueur);
}


/**
 * images new path file
 * @property {string} req.body.path - The path image of vainqueur.
 * @returns {Vainqueur}
 */
function images(req, res, next) {
    res.json(req.body.path)
}

/**
 * 
 * Create new Vainqueur
 * @property {string} req.body.clientId - The clientId of Vainqueur.
 * @property {string} req.body.ench_Id - The ench_Id of Vainqueur.
 * @property {string} req.body.desc - The desc of Vainqueur.
 * @property {string} req.body.path - The path of Vainqueur.
 * @returns {Vainqueur}
 */
function create(req, res, next) {
    console.log(req.body)
    const vainqueur = new Vainqueur({
        clientId: req.body.clientId,
        ench_Id: req.body.ench_Id,
        desc: req.body.desc,
        path: req.body.path,
    });


    vainqueur.populate('ench_Id').execPopulate()
    vainqueur.populate('clientId').execPopulate()
    // client.category.push(cat)
    vainqueur.save()

        .then(savedVainqueur => {
            res.json(savedVainqueur)
        })
        .catch(e => next(e));
}


/**
 * Get Vainqueur list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Vainqueur[]}
 */
function list(req, res, next) {

    Vainqueur.list()
        .then(vainqueurs => {
            res.json(vainqueurs)
        })
        .catch(e => next(e));
}

/**
 * Delete Vainqueur.
 * @returns {Vainqueur}
 */
function remove(req, res, next) {
    const vainqueur = req.vainqueur;
    vainqueur.remove()
        .then(deletedVainqueur => res.json(deletedVainqueur))
        .catch(e => next(e));
}

module.exports = { load, get, create, list, remove, images, filter };
