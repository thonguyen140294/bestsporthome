const _ = require('lodash');
const firebaseCommon = require('../../helpers/firebaseCommon.helper');
const appConstant = require('../../helpers/constant.helper')

const TABLE_BRAND = appConstant.DATA_TABLE.BRAND;
/**
 * schema
 * 
 * category (id)
 * name (string)
 * status (number)
 * created_at (number)
 * updated_at (number)
 */
const createBrand = async (data) => {
    return await firebaseCommon.create(`${TABLE_BRAND}`, data);
}

const getBrandById = async (id) => {
    return await firebaseCommon.read(`${TABLE_BRAND}/${id}`)
}

const getBrandByName = async (name) => {
    const queries = [{field: 'name', compare: '==', value: name}]
    return await firebaseCommon.queryTo(`${TABLE_BRAND}`, queries)
}

const getBrandByCategory = async (id) => {
    const queries = [{field: 'category', compare: '==', value: id}]
    return await firebaseCommon.queryTo(`${TABLE_BRAND}`, queries)
}

const getBrands = async () => {
    return await firebaseCommon.read(`${TABLE_BRAND}`)
}

module.exports = {
    createBrand,
    getBrandById,
    getBrandByName,
    getBrandByCategory,
    getBrands
}