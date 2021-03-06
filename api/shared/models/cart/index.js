const schema = require('./schema')
const appConstant = require('../../helpers/constant.helper');
const model = require('mongoose').model(appConstant.DATA_TABLE.CART, schema)

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

const getByUser = async (user) => {
	return new Promise((resolve, reject) => {
			model
				.findOne({user})
				.lean()
				.then(result => {
						resolve(result)
				})
				.catch(error => {
						reject(error)
				})
	})
}

const updateItem = async (id, items) => {
	return new Promise((resolve, reject) => {
			model
				.findByIdAndUpdate(id, {items})
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
		getByUser,
		updateItem
}