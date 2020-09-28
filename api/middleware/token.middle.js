const userAuthentication = require('../shared/security/userAuth.security')
const appConstant = require('../shared/helpers/constant.helper')

const verifyToken = async (req, res, next) => {
    try {
        let reqToken = req.header('token');
        let lang = req.header('locale');
        if (reqToken) {
            const token = await userAuthentication.verifyToken(reqToken, lang)
            if(token.member.role === appConstant.USER.ROLE.USER){
                res.locals.tid = token.id
                res.locals.uid = token.member.id;
                res.locals.lang = lang;
                next();
            }
            else next(102);
        } else {
            next(102)
        }
    }
    catch (err) {
        console.log(err)
        next(102)
    }
}

const verifyAdminToken = async (req, res, next) => {
    try {
        let reqToken = req.header('token');
        let lang = req.header('locale');
        if (reqToken) {
            const token = await userAuthentication.verifyToken(reqToken, lang)
            if(token.member.role === appConstant.USER.ROLE.ADMIN){
                res.locals.tid = token.id
                res.locals.uid = token.member.id;
                res.locals.lang = lang;
                next();
            }
            else next(102);
        }
        else next(102)
    }
    catch (err) {
        console.log(err)
        next(102)
    }
}

module.exports = {
    verifyToken,
    verifyAdminToken
}