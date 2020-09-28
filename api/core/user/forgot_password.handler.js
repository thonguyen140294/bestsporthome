'use strict';
const appConstant = require('../../shared/helpers/constant.helper');
const encodeDecode = require('../../shared/security/encodeDecode.security');
const userModel = require('../../shared/models/user');
const passwordManagement = require('../../shared/security/passGenerator.security');
const userAuthen = require('../../shared/security/userAuth.security');
const localeUtils = require('../../shared/helpers/localesUtils.helper');
/**
 * @method POST
 * @path /forgot_password/code
 * @param lang default is english
 * @param email
 * @return success message
 */
const sendCode = async (lang, phone) => {
    email = email.toLowerCase()
    const user = await userModel.findByPhone(phone)
    if (!user) {
        throw Error("Account is not found")
    }
    if (user.status === appConstant.USER.STATUS.NEW) {
        throw Error("Account is not active");
    }
    if (user.is_locked) {
        throw Error("Account has blocked");
    }
    const code = passwordManagement.getNonceString(6, true)
    await userAuthen.sendVerifyPhone(phone, code)
    await userModel.updateUser(user.id, { reset_code: code })
    return {
        message: "Reset code sent to your phone"
    }
}

/**
 * @method POST
 * @path /forgot_password/reset
 * @param lang default is english
 * @param code
 * @return success message
 */
const reset = async (phone, lang, body) => {
    const user = await userModel.findByPhone(phone)
    if (!user) {
        throw Error("Account is not found");
    }
    if (user.reset_code !== body.code) {
        throw Error("Code reset invalid");
    }
    let passwordEncode = await passwordManagement.hashPasswordMd5(encodeDecode.decode(body.new_password))
    await userModel.updateUser(user.id, {
        password: passwordEncode
    });
    return {
        message: "Reset password is successfully",
    }
}

module.exports = {
    sendCode,
    reset
}