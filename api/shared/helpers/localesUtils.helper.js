const i18n = require('i18n');
const LOCALE_DEFAULT = 'en';
const locales = ['en', 'ja'];

const userMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'USER',
        locale: lang
    });
    return language;
}

const mailMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'MAIL',
        locale: lang
    });
    return language;
}

const commMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'COMMON',
        locale: lang
    });
    return language;
}

module.exports = {
    userMessage,
    mailMessage,
    commMessage
}