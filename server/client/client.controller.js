const Client = require('./client.model');
const Jeton = require('../jeton/jeton.model');
const Enchere = require('../enchere/enchere.model')

/**
 * Load Client and append to req.
 */
function load(req, res, next, id) {
    Client.get(id)
        .then((client) => {
            req.client = client; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

function filter(req, res, next) {
    const q = {}
    if (req.body._id) {
        q._id = req.body._id
    }
    if (req.body.nomC) {
        q.nomC = { "$regex": req.body.nomC, "$options": "i" }
    }
    if (req.body.email) {
        q.email = req.body.email
    }
    if (req.body.createdAt) {
        q.createdAt = req.body.createdAt
    }
    if (req.body.solde) {
        q.solde = req.body.solde
    }

    let limit = 5
    let skip = (req.query.page - 1) * limit
    if (req.query.page == 0 || !req.query.page) {
        Client.filter(q).then(clients => res.json(clients))
            .catch(e => next(e));
    } else
        Client.filter(q, { limit: limit, skip: skip })
            .then((client, err) => {
                if (err) {
                    console.log(err)
                } else
                    return res.json(client) // eslint-disable-line no-param-reassign

            })
            .catch(e => next(e));
}

/**
 * Get client
 * @returns {Client}
 */
function get(req, res) {
    return res.json(req.client);
}


/**
 * images new test file
 * @property {string} req.body.path - The path image of fournisseur.
 * @returns {Client}
 */
function images(req, res, next) {
    res.json(req.body.path)
}

/**
 * 
 * Create new client
 * @property {string} req.body.nomC - The nomC of client.
 * @property {string} req.body.email - The email of client.
 * @property {string} req.body.jetonId - The jetonId of client.
 * @property {number} req.body.solde - The solde of client.
 * @property {string} req.body.phone - The jetonId of client.
 * @property {string} req.body.adresse - The jetonId of client.
 * @property {string} req.body.path - The path of client.
 * @returns {Client}
 */
function create(req, res, next) {
    console.log(req.body)
    const client = new Client({
        nomC: req.body.nomC,
        email: req.body.email,
        jetonId: req.body.jetonId,
        phone: req.body.phone,
        adresse: req.body.adresse,
        solde: req.body.solde,
        path: req.body.path,
    });
    client.populate('jetonId').execPopulate()
    client.save()

        .then(savedClient => {
            res.json(savedClient)
        })
        .catch(e => next(e));
}

/**
 * Update existing Enchere
 * @property {string} req.body.nomC - The nomC of client.
 * @property {string} req.body.email - The email of client.
 * @property {string} req.body.phone - The jetonId of client.
 * @property {string} req.body.adresse - The jetonId of client.
 * @property {number} req.body.solde - The solde of client.
 * @property {string} req.body.path - The path of client.
 * @returns {Client}
 */
function update(req, res, next) {
    const client = req.client;
    client.nomC = req.body.nomC;
    client.email = req.body.email;
    client.path = req.body.path;
    client.phone = req.body.phone;
    client.adresse = req.body.adresse;
    client.solde = req.body.solde;

    client.save()
        .then(savedClient => res.json(savedClient))
        .catch(e => next(e));
}

/**
 * affect existing jeton to an existing client
 * @property {string} req.body.jetonId - Jeton 
 * @property {string} req.body.user_Id - The clientId of client.
 * @returns {Client}
 */
async function affectJeton(req, res, next) {
    const c = await Client.findById({ _id: req.body.user_Id })
    const j = await Jeton.findById({ _id: req.body.jetonId })

    Client.update(
        { _id: c._id },
        { $push: { jetonId: j } }
    ).exec()
    c.save()
        .then(savedClient => res.json(savedClient))
        .catch(e => next(e));
}


/**
 * affect existing Enchere to an existing client
 * @property {string} req.body.ench_Id - Enchere 
 * @property {string} req.body.clientId - The clientId of client.
 * @returns {Client}
 */
async function affectEnchere(req, res, next) {
    const c = await Client.findById({ _id: req.body.clientId })
    const x = await Enchere.findById({ _id: req.body.ench_Id })

    Client.update(
        { _id: c._id },
        { $push: { ench_Id: x } }
    ).exec()
    c.save()
        .then(savedClient => res.json(savedClient))
        .catch(e => next(e));
}

/**
 * Get client list.
 * @property {number} req.query.page - Number of clients to be skipped.
 * @returns {Client[]}
 */
function list(req, res, next) {
    // console.log(req.query.page)
    if (req.query.page == 0) {
        Client.list().then(clients => res.json(clients))
            .catch(e => next(e));
    } else {
        let limit = 5
        let skip = (req.query.page - 1) * limit
        Client.list({ limit: limit, skip: skip })
            .then(clients => res.json(clients))
            .catch(e => next(e));
    }
}

/**
 * Delete Enchere.
 * @returns {Client}
 */
function remove(req, res, next) {
    const client = req.client;
    client.remove()
        .then(deletedClient => res.json(deletedClient))
        .catch(e => next(e));
}

module.exports = { affectJeton, load, get, create, update, list, remove, images, affectEnchere, filter };
