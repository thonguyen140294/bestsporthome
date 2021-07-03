'use strict';
const _ = require('lodash')
const jwt = require('jsonwebtoken');
const moment = require('moment');
const appConstant = require('../../shared/helpers/constant.helper');
const signinHistoryModel = require('../models/signin_history')
const encodeDecode = require('./encodeDecode.security')


const generateToken = (uid, sid) => {
    let now = moment().valueOf();
    if (user.accessToken) {
        user.accessToken = null;
    }
    let payload = {
        "iat": now,
        "exp": now + appConstant.TIME_EXP_ACCESS_TOKEN,
        "uid": uid,
        "sid": sid
    };
    return jwt.sign(payload, process.env.token_key);
}

const verifyToken = async (reqToken) => {
    let decodedToken = jwt.verify(reqToken, process.env.token_key);
    if (!decodedToken || decodedToken.exp < moment().valueOf()) {
        throw Error("Invalid token")
    }
    return decodedToken
}

const createToken = async (uid, ua) => {
    const sid = await encodeDecode.encode(JSON.stringify(ua))
    const token = await tokenModel.createToken(uid, sid)
    return { token }
}

const createSignInHistory = async (member_id, data) => {
    await signinHistoryModel.createHistory({
        member: member_id,
        ip: data.requestIp.replace('::ffff:', '').toString(),
        ua: `${data.userAgent.ua} (${data.userAgent.browser.name || ''} ${data.userAgent.os.name || ''})`
    })
}

module.exports = {
		generateToken,
    verifyToken,
    createSignInHistory,
    createToken
}