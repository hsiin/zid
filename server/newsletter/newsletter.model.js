const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Newsletter Schema
 */
const NewsletterSchema = new mongoose.Schema({
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


NewsletterSchema.method({
});

/**
 * Statics
 */
NewsletterSchema.statics = {
    /**
     * Get Newsletter
     * @param {ObjectId} id - The objectId of Newsletter.
     * @returns {Promise<Newsletter, APIError>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then((newsletter) => {
                if (newsletter) {
                    return newsletter;
                }
                const err = new APIError('No such news letter exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
 * List users in descending order of 'createdAt' timestamp.
 * @param {number} skip - Number of users to be skipped.
 * @param {number} limit - Limit number of users to be returned.
 * @returns {Promise<Newsletter[]>}
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
* @returns {Promise<Newsletter, APIError>}
*/
    filter(q, obj) {
        if (!obj) {
            return this.find(q)
                .sort({ _id: -1 })
                .exec()
                .then((newsletter) => {
                    if (newsletter) {
                        return newsletter;

                    }
                    const err = new APIError('No such newsletter exists!', httpStatus.NOT_FOUND);
                    return Promise.reject(err);
                });
        } else {
            return this.find(q)
                .sort({ _id: -1 })
                .skip(+obj.skip)
                .limit(+obj.limit)

                .exec()
                .then((newsletter) => {
                    if (newsletter) {
                        return newsletter;

                    }
                    const err = new APIError('No such newsletter exists!', httpStatus.NOT_FOUND);
                    return Promise.reject(err);
                });
        }

    },

};




/**
 * @typedef Newsletter
 */
module.exports = mongoose.model('Newsletter', NewsletterSchema);
