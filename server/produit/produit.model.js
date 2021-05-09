const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const string = require('joi/lib/types/string');


/**
 * Produit Schema
 */
const ProduitSchema = new mongoose.Schema({
    produit: {
        type: String,
        required: true,
    },
    cat: {
        type: String,
        required: true
    },
    fournisseur: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        require: true
    },
    valcoup: {
        type: String,
        required: true
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


ProduitSchema.method({
});

/**
 * Statics
 */
ProduitSchema.statics = {
    /**
     * Get Produit
     * @param {ObjectId} id - The objectId of Produit.
     * @returns {Promise<Produit, APIError>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then((produit) => {
                if (produit) {
                    return produit;
                }
                const err = new APIError('No such produit exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List Products in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of Products to be skipped.
     * @param {number} limit - Limit number of Products to be returned.
     * @returns {Promise<Produit[]>}
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
    * Get Produit
    * @returns {Promise<Produit, APIError>}
    */
    filter(q, obj) {
        if (!obj) {
            return this.find(q)
                .sort({ _id: -1 })
                .exec()
                .then((produit) => {
                    if (produit) {
                        return produit;
                    }
                    const err = new APIError('No such produit exists!', httpStatus.NOT_FOUND);
                    return Promise.reject(err);
                });
        } else {
            return this.find(q)
                .sort({ _id: -1 })
                .skip(+obj.skip)
                .limit(+obj.limit)

                .exec()
                .then((produit) => {
                    if (produit) {
                        return produit;
                    }
                    const err = new APIError('No such produit exists!', httpStatus.NOT_FOUND);
                    return Promise.reject(err);
                });
        }

    },
};




/**
 * @typedef Produit
 */
module.exports = mongoose.model('Produit', ProduitSchema);

