const schema = require('./schema')
const appConstant = require('../../helpers/constant.helper');
const model = require('mongoose').model(appConstant.DATA_TABLE.SIGNIN_HISTORY, schema)

const create = async (data) => {
		return new Promise((resolve, reject) => {
				model
					.findOneAndUpdate({id: data.ip}, data, { upsert: true, new: true, setDefaultsOnInsert: true })
					.then(result => {
							resolve(result)
					})
					.catch(error => {
							reject(error)
					})
		})
}

module.exports = {
	create
}