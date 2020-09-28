'use strict';
const _ = require('lodash');
const userModel = require('../../shared/models/user')
const appConstant = require('../../shared/helpers/constant.helper')
const passwordManagement = require('../../shared/security/passGenerator.security')
const encodeDecode = require('../../shared/security/encodeDecode.security');
const userAuthentication = require('../../shared/security/userAuth.security')

/**
 * @method POST
 * @path /login
 * @param lang default is english
 * @param auth
 * @return success message
 */
const login = async (locals, data, role) => {
    let auth = await encodeDecode.decode(locals.auth);
    let phone = auth.toString().split(':')[0]
    let password = auth.toString().split(':')[1];
    let user = await userModel.findByPhone(phone);
    if (!user || user.role !== role) {
        throw Error("Account is not found");
    }
    if (! await passwordManagement.comparePassword(password, user.password)) {
        throw Error("Password is not valid")
    }
    if (user.is_locked) {
        throw Error("Account has blocked");
    }
    if (user.status === appConstant.USER.STATUS.NEW) {
        throw Error("Please confirm your phone number");
    }
    await userAuthentication.createSignInHistory(user.id, data)
    return await userAuthentication.createToken(user, data, locals.lang)
}

/**
 * @method POST
 * @path /verify-login
 * @param lang default is english
 * @param code
 * @return success message
 */
const verifyLogin = async (locals, body) => {
    let user = await userModel.findById(locals.uid);
    if (!user) {
        throw Error("Account is not found");
    }
    if (user.status === appConstant.USER.STATUS.NEW && user.code_confirm !== body.code) {
        throw Error("Code invalid")
    }
    await userModel.updateUser(user.id, { status: appConstant.USER.STATUS.CONFIRMED })
    return {
        message: 'success'
    }
}

module.exports = {
    login,
    verifyLogin
}