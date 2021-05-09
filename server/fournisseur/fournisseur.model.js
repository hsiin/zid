const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const string = require('joi/lib/types/string');


/**
 * Fournisseur Schema
 */
const FournisseurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  site: {
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


FournisseurSchema.method({
});

/**
 * Statics
 */
FournisseurSchema.statics = {
  /**
   * Get Fournisseur
   * @param {ObjectId} id - The objectId of Fournisseur.
   * @returns {Promise<Fournisseur, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((fournisseur) => {
        if (fournisseur) {
          return fournisseur;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Fournisseur[]>}
   */
  list(obj) {
    var d = null;
    if (!obj) {
      return this.find()
        .sort({ _id: -1 })
        .exec();
    } else {
      return this.find()
        .sort({ _id: -1 })
        .skip(+obj.skip)
        .limit(+obj.limit).exec();
    }
  },

  /**
  * Get Fournisseur
  * @returns {Promise<Fournisseur, APIError>}
  */
  filter(q, obj) {
    if (!obj) {
      return this.find(q)
        .sort({ _id: -1 })
        .exec()
        .then((fournisseur) => {
          if (fournisseur) {
            return fournisseur;

          }
          const err = new APIError('No such fournisseur exists!', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        });
    } else {
      return this.find(q)
        .sort({ _id: -1 })
        .skip(+obj.skip)
        .limit(+obj.limit)
        .exec()
        .then((fournisseur) => {
          if (fournisseur) {
            return fournisseur;

          }
          const err = new APIError('No such fournisseur exists!', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        });
    }

  },
};




/**
 * @typedef Fournisseur
 */
module.exports = mongoose.model('fournisseur', FournisseurSchema);