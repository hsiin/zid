const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const number = require('joi/lib/types/number');

/**
 * Paiement Schema
 */
const JetonSchema = new mongoose.Schema({

  nom: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  valeur: {
    type: Number,
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
JetonSchema.method({
});

/**
 * Statics
 */
JetonSchema.statics = {
  /**
   * Get Jeton
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<Jeton, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((jeton) => {
        if (jeton) {
          return jeton;
        }
        const err = new APIError('No such Jeton exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Jeton[]>}
   */
  list(obj) {
    if (!obj) {
      return this.find()
        .sort({ _id: -1 })
        .exec();
    } else {
      return this.find()
        .sort({ _id: -1 })
        .skip(+obj.skip)
        .limit(+obj.limit)
        .exec();
    }
  },

  /**
  * Get Jeton
  * @returns {Promise<Jeton, APIError>}
  */
  filter(q, obj) {
    if (!obj) {
      return this.find(q)
        .sort({ _id: -1 })
        .exec()
        .then((jeton) => {
          if (jeton) {
            return jeton;

          }
          const err = new APIError('No such jeton exists!', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        });
    } else {
      return this.find(q)
        .sort({ _id: -1 })
        .skip(+obj.skip)
        .limit(+obj.limit)

        .exec()
        .then((jeton) => {
          if (jeton) {
            return jeton;

          }
          const err = new APIError('No such jeton exists!', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        });
    }

  },
},

  /**
   * @typedef Jeton
   */
  module.exports = mongoose.model('Jeton', JetonSchema);
