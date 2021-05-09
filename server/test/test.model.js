const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const string = require('joi/lib/types/string');


/**
 * Test Schema
 */
const TestSchema = new mongoose.Schema({
    path: {
        type: [String]
    },
    name: {
        type: String
    },
    lname: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


TestSchema.method({
});

/**
 * Statics
 */
TestSchema.statics = {
    /**
     * Get Test
     * @param {ObjectId} id - The objectId of Test.
     * @returns {Promise<Test, APIError>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then((test) => {
                if (test) {
                    return test;
                }
                const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List users in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<Test[]>}
     */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};




/**
 * @typedef Test
 */
module.exports = mongoose.model('Test', TestSchema);