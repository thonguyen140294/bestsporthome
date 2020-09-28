const _ = require('lodash');
const firebaseCommon = require('../../helpers/firebaseCommon.helper');
const appConstant = require('../../helpers/constant.helper')

const TABLE_CONTACT = appConstant.DATA_TABLE.CONTACT;
/**
 * schema
 * 
 * name (string)
 * email (string)
 * title (string)
 * content (string)
 * created_at (number)
 * updated_at (number)
 */
const create = async (data) => {
    return await firebaseCommon.create(`${TABLE_CONTACT}`, data);
}


module.exports = {
    create
}