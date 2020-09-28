'use strict';
const _ = require('lodash')
const jwt = require('jsonwebtoken');
const moment = require('moment');
const localesUtil = require('../helpers/localesUtils.helper');
const configCommon = require('../helpers/configCommon.helper')
const appConstant = require('../../shared/helpers/constant.helper');
const tokenModel = require('../models/token')
const signinHistoryModel = require('../models/signin_history')
const client = require('twilio')(configCommon.getKeyPhone().accountSid, configCommon.getKeyPhone().authToken);



const generateAccessToken = (user) => {
    let now = moment().valueOf();
    if (user.accessToken) {
        user.accessToken = null;
    }
    let payload = {
        "iat": now,
        "exp": now + appConstant.TIME_EXP_ACCESS_TOKEN,
        "uid": user.id,
        "claims": {
            user
        }
    };
    return jwt.sign(payload, configCommon.getJwt().key);
}

const generateRefreshToken = (user, ua) => {
    let now = moment().valueOf();
    if (user.accessToken) {
        user.accessToken = null;
    }
    let payload = {
        "iat": now,
        "exp": now + appConstant.TIME_EXP_REFRESH_TOKEN,
        "uid": user.id,
        "claims": {
            ua
        }
    };
    return jwt.sign(payload, configCommon.getJwt().key);
}

const verifyToken = async (reqToken, lang) => {
    let decodedToken = jwt.verify(reqToken, configCommon.getJwt().key);
    const token = await tokenModel.findByMember(reqToken)
    if (!token || token.updated_at < moment().valueOf() - appConstant.TIME_EXP_ACCESS_TOKEN ) {
        throw Error("Access token invalid")
    }
    if(token.member.id !== decodedToken.uid){
        throw Error('Access token Invalid')
    }
    await tokenModel.updateToken(token.id, { updated_at: moment().valueOf() })
    return token
}

const verifyRefreshToken = (token, lang, ua) => {
    let decodedToken = jwt.verify(token, configCommon.getJwt().key);
    if (decodedToken.exp < moment().valueOf() || decodedToken.claims.ua !== ua) {
        throw new Error("Refresh token invalid");
    }
    return decodedToken
}

const sendVerifyPhone = async (phone, code) => {
    return new Promise(async (resolve, reject) => {
        const text = `Your verify code is ${code}.This code is valid for 5 minutes`
        client.messages.create({
            from: configCommon.getKeyPhone().phoneTwilio,
            to: `+${phone}`,
            body: text
        }).then(async message => {
            console.log(message)
            resolve({
                message: "Message sent successfully."
            });
        })
        .catch((err) => {
            console.log(err);
            reject("Send message failed");
        })

    })
}

const createToken = async (user, ua, lang) => {
    await tokenModel.removeExpiredToken(user.id)
    const token = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user, ua);
    await tokenModel.createToken({
        member: _.pick(user, ['id', 'role']),
        token: token,
        refresh_token: refreshToken
    })
    return { token, refreshToken, role: user.role }
}

const createSignInHistory = async (member_id, data) => {
    await signinHistoryModel.createHistory({
        member: member_id,
        ip: data.requestIp.replace('::ffff:', '').toString(),
        ua: `${data.userAgent.ua} (${data.userAgent.browser.name || ''} ${data.userAgent.os.name || ''})`
    })
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken,
    sendVerifyPhone,
    createSignInHistory,
    createToken
}