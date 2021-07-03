const moment = require('moment');
const { Schema } = require('mongoose');

const schema = new Schema({
		user: { type: String },
		items: [{
			id: { type: String },
			amount: { type: Number },
			property: {type: Object }
		}],
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
