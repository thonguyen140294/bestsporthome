'use strict';
const getConfig = () => {
    switch (process.env.MODE_BUILD) {
        case 'dev':
            return require('../../config/development')
        case 'prod':
            return require('../../config/production')
    }
    return require('../../config/development')
}

const getWhiteList = () => {
    return getConfig().whiteList;
}

const getJwt = () => {
    return getConfig().jwt
}

const getEncodeDecode = () => {
    return getConfig().encodeDecode;
}

const getGoogleCloud = () => {
    return getConfig().googleCloud;
}

const getKeyPhone = () => {
    return getConfig().keyPhone;
}

module.exports = {
    getWhiteList,
    getJwt,
    getEncodeDecode,
    getKeyPhone,
    getGoogleCloud
}