const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Vainqueur Schema
 */
const VainqueurSchema = new mongoose.Schema({

    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: false,

    },
    ench_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enchere',
    },
    desc: {
        type: String,
        required: true
    },
    path: {
        type: [String]
    },
    createdAt: {
        type: String,
        default: new Date().toISOString().substr(0, 10)
    }
});

/**
 * Methods
 */
VainqueurSchema.method({
});

/**
 * Statics
 */
VainqueurSchema.statics = {
    /**
     * Get Vainqueur
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<Vainqueur, APIError>}
     */
    get(id) {
        return this.findById(id)
            .populate({
                path: 'clientId',
                model: 'Client',
                populate: {
                    path: 'jetonId',
                    model: 'Jeton'
                }
            })
            .populate({
                path: 'ench_Id',
                model: 'Enchere',
                populate: {
                    path: 'produitId',
                    model: 'Produit'
                }
            })
            .exec()
            .then((vainqueur) => {
                if (vainqueur) {
                    return vainqueur;
                }
                const err = new APIError('No such vainqueur exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
* Get Vainqueur
* @param {Object} q - The objectId of user.
* @returns {Promise<Vainqueur, APIError>}
*/
    filter(q) {
        return this.find(q)
            .populate({
                path: 'clientId',
                model: 'Client',
                populate: {
                    path: 'jetonId',
                    model: 'Jeton'
                }
            })
            .populate({
                path: 'ench_Id',
                model: 'Enchere',
                populate: {
                    path: 'produitId',
                    model: 'Produit'
                }
            })
            .exec()
            .then((vainqueur) => {
                if (vainqueur) {
                    return vainqueur;
                }
                const err = new APIError('No such vainqueur exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },



    /**
     * List vain in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of vain to be skipped.
     * @param {number} limit - Limit number of vain to be returned.
     * @returns {Promise<Vainqueur[]>}
     */
    list() {
        return this.find()
            .sort({ createdAt: -1 })
            .populate({
                path: 'clientId',
                model: 'Client',
                populate: {
                    path: 'jetonId',
                    model: 'Jeton'
                },


            })
            .populate({
                path: 'ench_Id',
                model: 'Enchere',
                populate: {
                    path: 'produitId',
                    model: 'Produit'
                }
            })
            .exec();
    }
};

/**
 * @typedef Vainqueur
 */
module.exports = mongoose.model('Vainqueur', VainqueurSchema);
