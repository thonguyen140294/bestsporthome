'use strict';
const _ = require('lodash')
const categoryModel = require('../../shared/models/category')
const localsUtil = require('../../shared/helpers/localesUtils.helper');

/**
 * @method GET
 * @path /category
 * @param uid
 * @param lang default is english
 * @return success message
 */
const getCategory = async () => {
    const categories = await categoryModel.getCategories()
    return _.map(categories, category => _.pick(category, ['name', 'id']))
}

module.exports = {
    getCategory
}