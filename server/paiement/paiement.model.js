const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Paiement Schema
 */
const PaiementSchema = new mongoose.Schema({
  pai: {
    type: String,
    required: true
  },
  Client_id: {
    type: String,
    required: true
  },
  ench_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enchere',
  },
  etat: {
    type: String,
    required: true
  },

  createdAt: {
    type: String,
    default: new Date().toISOString().substr(0, 10)
  }
});


/**
 * Methods
 */
PaiementSchema.method({
});

/**
 * Statics
 */
PaiementSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<Paiement, APIError>}
   */
  get(id) {
    return this.findById(id)
      .populate({
        path: 'ench_id',
        model: 'Enchere',
        populate: {
          path: 'produitId',
          model: 'Produit'
        }
      })
      .exec()
      .then((paiement) => {
        if (paiement) {
          return paiement;
        }
        const err = new APIError('No such Paiement exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
  * Get categories
  * @returns {Promise<Paiement, APIError>}
  */
  filter(q, obj) {
    if (!obj) {
      return this.find(q)
        .sort({ _id: -1 })
        .populate({
          path: 'ench_id',
          model: 'Enchere',
          populate: {
            path: 'produitId',
            model: 'Produit'
          }
        })
        .exec()
        .then((paiement) => {
          if (paiement) {
            return paiement;

          }
          const err = new APIError('No such paiement exists!', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        });
    } else {
      return this.find(q)
        .sort({ _id: -1 })
        .populate({
          path: 'ench_id',
          model: 'Enchere',
          populate: {
            path: 'produitId',
            model: 'Produit'
          }
        })
        .skip(+obj.skip)
        .limit(+obj.limit)

        .exec()
        .then((paiement) => {
          if (paiement) {
            return paiement;

          }
          const err = new APIError('No such paiement exists!', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        });
    }

  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Paiement[]>}
   */
  list(obj) {
    if (!obj) {
      return this.find()
        .sort({ _id: -1 })
        .exec();
    } else {
      return this.find()
        .sort({ _id: -1 })
        .populate({
          path: 'ench_id',
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
 * @typedef Paiement
 */
module.exports = mongoose.model('Paiement', PaiementSchema);
