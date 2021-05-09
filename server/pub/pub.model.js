const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Pub Schema
 */
const PubSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    path: {
        type: [String]
    },
    dateDebut: {
        type: String,
        default: new Date().toISOString().substr(0, 10)
    },
    DateFin: {
        type: String,
        default: new Date().toISOString().substr(0, 10)
    },
    createdAt: {
        type: String,
        default: new Date().toISOString().substr(0, 10)
    }
});


PubSchema.method({
});

/**
 * Statics
 */
PubSchema.statics = {
    /**
     * Get Pub
     * @param {ObjectId} id - The objectId of Pub.
     * @returns {Promise<Pub, APIError>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then((pub) => {
                if (pub) {
                    return pub;
                }
                const err = new APIError('No such pub exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List users in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<Pub[]>}
     */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    },
    /**
* Get pubs
* @returns {Promise<Pub, APIError>}
*/
    filter(q, obj) {
        if (!obj) {
            return this.find(q)
                .sort({ _id: -1 })
                .exec()
                .then((pub) => {
                    if (pub) {
                        return pub;

                    }
                    const err = new APIError('No such pub exists!', httpStatus.NOT_FOUND);
                    return Promise.reject(err);
                });
        } else {
            return this.find(q)
                .sort({ _id: -1 })
                .skip(+obj.skip)
                .limit(+obj.limit)

                .exec()
                .then((pub) => {
                    if (pub) {
                        return pub;

                    }
                    const err = new APIError('No such pub exists!', httpStatus.NOT_FOUND);
                    return Promise.reject(err);
                });
        }

    },
};




/**
 * @typedef Pub
 */
module.exports = mongoose.model('Pub', PubSchema);
