const crypto = require('crypto-js');

const encode = async (content) => {
    return await crypto.AES.encrypt(content, process.env.encrypt_key).toString();
}

const decode = async (content) => {
    return await crypto.AES.decrypt(content, process.env.encrypt_key).toString(crypto.enc.Utf8);
}

module.exports = {
    encode,
    decode
}
