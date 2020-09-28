'use strict';
const _ = require('lodash')
const brandModel = require('../../shared/models/brand');
const localsUtil = require('../../shared/helpers/localesUtils.helper');

/**
 * @method GET
 * @path /category
 * @param 
 * @return success message
 */
const getBrand = async () => {
    const brands = await brandModel.getBrands()
    return _.map(brands, brand => _.pick(brand, ['name', 'id', 'category']))
}

/**
 * @method GET
 * @path /category/:category_id/brand
 * @param category_id
 * @return success message
 */
const getBrandByCategory = async (category_id) => {
    const brands = await brandModel.getBrandByCategory(category_id)
    return _.map(brands, brand => _.pick(brand, ['name', 'id', 'category']))
}

module.exports = {
    getBrand,
    getBrandByCategory
}