const schema = require('./schema');
const appConstant = require('../../helpers/constant.helper');
const Mongoose = require('mongoose');

const model = Mongoose.model(appConstant.DATA_TABLE.USER, schema)

const create = async (data) => {
    return new Promise((resolve, reject) => {
				model
            .create(data)
            .then(result => {
                resolve(result._id.toString())
            })
            .catch(error => {
                reject(error)
            })
    })
}

const findById = async (uid) => {
    return new Promise((resolve, reject) => {
				model
            .findById(uid)
            .lean()
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const update = async (uid, data) => {
    return new Promise((resolve, reject) => {
				model
            .findOneAndUpdate(uid, data)
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
    findById,
    update
}