const moment = require('moment');
const { Schema } = require('mongoose');

const schema = new Schema({
    name: { type: String },
		role: { type: Number },
    phone: { type: String },
		password: { type: String },
    email: { type: String },
    address: { type: String },
		points: { type: String },
    status: { type: Number },
    created_at: { type: Number },
		updated_at: { type: Number }
})
/**
 * Validations
 */
/**
 * Pre hook
 */
schema
    .pre('save', function(next) {
        const time = moment().valueOf()
        this.created_at = time
        this.updated_at = time
        next()
    });
schema
    .pre('findOneAndUpdate', function(next) {
        this.updated_at = moment().valueOf()
        next()
    });
module.exports = schema
