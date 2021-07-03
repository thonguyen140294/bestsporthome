const schema = require('./schema')
const appConstant = require('../../helpers/constant.helper');
const model = require('mongoose').model(appConstant.DATA_TABLE.ITEM, schema)

const create = async (data) => {
	return new Promise((resolve, reject) => {
			model
				.create(data)
				.then(result => {
						resolve(result)
				})
				.catch(error => {
						reject(error)
				})
	})
}

const get = async (query) => {
	return new Promise((resolve, reject) => {
			model
				.find(query)
				.lean()
				.then(result => {
						resolve(result)
				})
				.catch(error => {
						reject(error)
				})
	})
}

const update = async (id, data) => {
	return new Promise((resolve, reject) => {
			model
				.findByIdAndUpdate(id, data)
				.lean()
				.then(result => {
						resolve(result)
				})
				.catch(error => {
						reject(error)
				})
	})
}

module.exports = {
		create,
		get,
		update
}