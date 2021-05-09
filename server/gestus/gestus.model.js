const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const string = require('joi/lib/types/string');


/**
 * Gestus Schema
 */
const GestusSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mdp: {
        type: String,
        required: true
    },
    path: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    access: { type: Array }

});


GestusSchema.method({
});

/**
 * Statics
 */
GestusSchema.statics = {
    /**
     * Get Gestus
     * @param {ObjectId} id - The objectId of Gestus.
     * @returns {Promise<Gestus, APIError>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then((gestus) => {
                if (gestus) {
                    return gestus;
                }
                const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List users in descending order of 'createdAt' timestamp.
     * @returns {Promise<Gestus[]>}
     */
    list() {
        return this.find()
            .sort({ createdAt: -1 })
            .exec();
    }
};




/**
 * @typedef Gestus
 */
module.exports = mongoose.model('gestus', GestusSchema);
