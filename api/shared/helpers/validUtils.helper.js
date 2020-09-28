const appConstant = require('./constant.helper')
const _ = require('lodash')

const asciiCharacterValidator = (str) =>{
    let accii = /[^\x20-\x7F]/ ;
    return accii.test(str)
}
const paginationValidator = (query) => {
    let page = query.page && query.page>0 ? Number(query.page) : appConstant.PAGINATION.PAGE_DEFAULT
    let limit = query.limit && query.limit>0 ? Number(query.limit) : appConstant.PAGINATION.LIMIT_DEFAULT
    return { page, limit }
}
const isValidParams = (params, keys) => {
    let paramKeys = Object.keys(params)
    paramKeys.sort()
    keys.sort()
    return _.isEqual(paramKeys, keys)
}
const cleanObject = (obj) => {
    for(let key of Object.keys(obj)){
        if(obj[key] === null || obj[key] === undefined || obj[key] === "")delete obj[key]
    }
    return obj
}
module.exports = {
    asciiCharacterValidator,
    paginationValidator,
    isValidParams,
    cleanObject
}