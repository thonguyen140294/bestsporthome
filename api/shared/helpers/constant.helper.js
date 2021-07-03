'use strict';

module.exports = Object.freeze({
    TIME_EXP_ACCESS_TOKEN: 30 * 60000,         // 30'
    TIME_EXP_REFRESH_TOKEN: 24 * 60 * 60000,   // 1d
    HEADER: {
        LOCALE_DEFAULT: 'en',
        LOCALE_HEADER: 'locale',
        AUTH: 'auth',
        ACCESS_TOKEN: 'access-token',
        REFRESH_TOKEN: 'refresh-token',
        AGENT: 'user-agent'
    },
    USER: {
        ROLE: {
            USER: 0,
            ADMIN: 1
        },
        STATUS: {
            NEW: 0,
            ACTIVED: 1,
            VERIFYING: 2,
            VERIFIED: 3,
            CONFIRMED: 4,
            REJECTED: 5
        },
        LEVEL: {
            ONE: 1,
            TWO: 2,
            THREE: 3
        },
        RANKING: {
            COPPER: 50000,
            SILVER: 200000,
            GOLD: 1000000,
            PLATINUM: 3000000,
            DIAMOND: 10000000
        },
        SEX: {
            MALE: 0,
            FEMALE: 1,
            ORTHER: 2
        },
        OTPAUTH_URL: 'otpauth://totp/SecretKey?secret='
    },
    PAGINATION: {
        LIMIT_DEFAULT: 10,
        PAGE_DEFAULT: 1
    },
    CART:{
        STATUS: {
            NEW: 1,
            PROCESSING: 2,
            PAYMENT: 3
        }
    }, 
    DATA_TABLE: {
        USER: 'user',
        SIGNIN_HISTORY: 'signin_history',
        CART: 'cart',
				ITEM: 'item',
        COUPON: 'coupon',
    }
});