const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const number = require('joi/lib/types/number');


/**
 * Categorie Schema
 */
const CategorieSchema = new mongoose.Schema({
  categorie: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: String,
    default: new Date().toISOString().substr(0, 10)
  }
});


CategorieSchema.method({
});

/**
 * Statics
 */
CategorieSchema.statics = {
  /**
   * Get categorie
   * @param {ObjectId} id - The objectId of categorie.
   * @returns {Promise<Categorie, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((categorie) => {
        if (categorie) {
          return categorie;
        }
        const err = new APIError('No such categorie exists!', httpStatus.NOT_FOUND);
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
  * Get categories
  * @returns {Promise<Categorie, APIError>}
  */
  filter(q, obj) {
    if (!obj) {
      return this.find(q)
        .sort({ _id: -1 })
        .exec()
        .then((categorie) => {
          if (categorie) {
            return categorie;

          }
          const err = new APIError('No such categorie exists!', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        });
    } else {
      return this.find(q)
        .sort({ _id: -1 })
        .skip(+obj.skip)
        .limit(+obj.limit)

        .exec()
        .then((categorie) => {
          if (categorie) {
            return categorie;

          }
          const err = new APIError('No such categorie exists!', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        });
    }

  },
};




/**
 * @typedef Categorie
 */
module.exports = mongoose.model('categorie', CategorieSchema);
