const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const client = require('../client/client.model')

/**
 * Enchere Schema
 */
const EnchereSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        unique: true
    },
    produitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produit'
    },
    clientId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: false,
        index: { unique: true, dropDups: true }

    }],

    prix: {
        type: Number,
        required: true
    },
    valeur: {
        type: Number,
        required: true
    },
    nbminPar: {
        type: Number,
        required: true
    },
    keywords: {
        type: [{ name: String }],

        required: false
    },
    dateLancement: {
        type: String,
        default: new Date().toISOString().substr(0, 10)
    },
    createdAt: {
        type: String,
        default: new Date().toISOString().substr(0, 10)
    }
});

/**
 * Methods
 */
EnchereSchema.method({
});

/**
 * Statics
 */
EnchereSchema.statics = {
    /**
     * Get Enchere
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<Enchere, APIError>}
     */
    get(id) {
        return this.findById(id)
            .populate('produitId')
            .populate({
                path: 'clientId',
                model: 'Client',
                populate: {
                    path: 'jetonId',
                    model: 'Jeton'
                }
            })
            .exec()
            .then((enchere) => {
                if (enchere) {
                    return enchere;
                }
                const err = new APIError('No such enchere exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
    * Get Enchere
    * @returns {Promise<Enchere, APIError>}
    */
    filter(q, obj) {
        if (!obj) {
            return this.find(q)
                .sort({ _id: -1 })
                .populate('produitId')
                .populate({
                    path: 'clientId',
                    model: 'Client',
                    populate: {
                        path: 'jetonId',
                        model: 'Jeton'
                    }
                })
                .exec()
                .then((enchere) => {
                    if (enchere) {
                        return enchere;

                    }
                    const err = new APIError('No such enchere exists!', httpStatus.NOT_FOUND);
                    return Promise.reject(err);
                });
        } else {
            return this.find(q)
                .sort({ _id: -1 })
                .populate('produitId')
                .populate({
                    path: 'clientId',
                    model: 'Client',
                    populate: {
                        path: 'jetonId',
                        model: 'Jeton'
                    }
                })
                .skip(+obj.skip)
                .limit(+obj.limit)

                .exec()
                .then((enchere) => {
                    if (enchere) {
                        return enchere;

                    }
                    const err = new APIError('No such enchere exists!', httpStatus.NOT_FOUND);
                    return Promise.reject(err);
                });
        }

    },


    /**
     * List users in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<Enchere[]>}
     */
    list(obj) {
        if (!obj) {
            return this.find()
                .sort({ _id: -1 })
                .populate('produitId')
                .populate({
                    path: 'clientId',
                    model: 'Client',
                    populate: {
                        path: 'jetonId',
                        model: 'Jeton'
                    }
                })
                .exec();
        } else {
            return this.find()
                .sort({ _id: -1 })
                .populate('produitId')
                .populate({
                    path: 'clientId',
                    model: 'Client',
                    populate: {
                        path: 'jetonId',
                        model: 'Jeton'
                    }
                })
                .skip(+obj.skip)
                .limit(+obj.limit)
                .exec();
        }
    }
};

/**
 * @typedef Enchere
 */
module.exports = mongoose.model('Enchere', EnchereSchema);
