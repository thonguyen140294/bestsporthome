'use strict';

const _ = require('lodash');
const speakeasy = require('speakeasy')
const userModel = require('../../shared/models/user')
const appConstant = require('../../shared/helpers/constant.helper')
const passwordManagement = require('../../shared/security/passGenerator.security')
const encodeDecode = require('../../shared/security/encodeDecode.security')
const userAuthentication = require('../../shared/security/userAuth.security')

/**
 * @method POST
 * @path /register
 * @param lang default is english
 * @param body
 * @return success message
 */
const register = async (locals) => {
    try {
        let auth = await encodeDecode.decode(locals.auth)
        let phone = auth.split(':')[0]
        let name = auth.split(':')[1]
        let password = auth.split(':')[2]
        const user = await userModel.findByPhone(phone)
        if (user) {
            throw Error('This phone number is already in use')
        }
        let passwordEncode = await passwordManagement.hashPasswordMd5(password)
        let code_confirm = await passwordManagement.getNonceString(6, true)
        const data = {
            phone: phone,
            name: name,
            password: passwordEncode,
            auth_code: speakeasy.generateSecret({
                phone
            }).base32,
            role: appConstant.USER.ROLE.USER,
            status: appConstant.USER.STATUS.CONFIRMED,
            code_confirm: code_confirm,
            language: locals.lang,
            phone_confirmed: false,
            is_locked: false
        }
        await userModel.createUser(data)
        // await userAuthentication.sendVerifyPhone(phone, code_confirm);
        return {
            message: 'Successfully'
        }
    } catch (error) {
        throw Error(error.message)
    }
}

module.exports = {
    register
}