const getConfig = () => {
    switch (process.env.MODE_BUILD) {
        case 'dev':
            return require('../config/development')
        case 'prod':
            return require('../config/development')
        default:
            return require('../config/development')
    }
}

const getEncodeDecodeKey = () => {
    return getConfig().encodeDecode;
}

const getApiHost = () => {
    return getConfig().apiHost
}

export default {
    getEncodeDecodeKey,
    getApiHost
}