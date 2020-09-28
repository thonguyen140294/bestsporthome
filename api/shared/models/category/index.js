const _ = require('lodash');
const firebaseCommon = require('../../helpers/firebaseCommon.helper');
const appConstant = require('../../helpers/constant.helper')

const TABLE_CATEGORY = appConstant.DATA_TABLE.CATEGORY;
/**
 * schema
 * 
 * name (string)
 * status (number)
 * created_at (number)
 * updated_at (number)
 */
const createCategory = async (data) => {
    return await firebaseCommon.create(`${TABLE_CATEGORY}`, data);
}

const getCategoryById = async (id) => {
    return await firebaseCommon.read(`${TABLE_CATEGORY}/${id}`)
}

const getCategoryByName = async (name) => {
    const queries = [{field: 'name', compare: '==', value: name}]
    return await firebaseCommon.queryTo(`${TABLE_CATEGORY}`, queries)
}

const getCategories = async () => {
    return await firebaseCommon.read(`${TABLE_CATEGORY}`)
}

module.exports = {
    getCategories,
    getCategoryById,
    getCategoryByName,
    createCategory
}