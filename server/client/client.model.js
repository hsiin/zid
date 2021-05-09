const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Client Schema
 */
const ClientSchema = new mongoose.Schema({
    nomC: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true
        
    },
    phone: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    jetonId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jeton',
        required: false,
    }],
    ench_Id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enchere',
        required: false,
        index: {unique: true, dropDups: true}
    }],
    solde: {
        type: Number,
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
ClientSchema.method({
});

/**
 * Statics
 */
ClientSchema.statics = {
    /**
     * Get Client
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<Client, APIError>}
     */
    get(id) {
        return this.findById(id)
            .populate('jetonId')
            .populate({
                path: 'ench_Id',
                model: 'Enchere',
                populate: {
                    path: 'produitId',
                    model: 'Produit'
                }
            })
            .exec()
            .then((client) => {
                if (client) {
                    return client;
                }
                const err = new APIError('No such client exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
* Get Enchere
* @param {Object} q - The objectId of user.
* @returns {Promise<Enchere, APIError>}
*/
    filter(q) {
        return this.find(q)
            .populate('jetonId')
            .populate({
                path: 'ench_Id',
                model: 'Enchere',
                populate: {
                    path: 'produitId',
                    model: 'Produit'
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
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Categorie[]>}
   */
  list(obj) {
    if (!obj) {
      return this.find()
        .sort({ _id: -1 })
        .populate('jetonId')
        .populate({
            path: 'ench_Id',
            model: 'Enchere',
            populate: {
                path: 'produitId',
                model: 'Produit'
            }
        })
        .exec();
    } else {
      return this.find()
        .sort({ _id: -1 })
        .populate('jetonId')
        .populate({
            path: 'ench_Id',
            model: 'Enchere',
            populate: {
                path: 'produitId',
                model: 'Produit'
            }
        })
        .skip(+obj.skip)
        .limit(+obj.limit)
        .exec();
    }
  },
};

/**
 * @typedef Client
 */
module.exports = mongoose.model('Client', ClientSchema);
