
const verifyAuth = (req, res, next) => {
    let auth = req.header('auth');
    let lang = req.header('locale');
    try {
        if (!auth) {
            throw new Error('authentication token not found');
        }
        res.locals.auth = auth;
        res.locals.lang = lang;
        next();
    } catch (err) {
        console.log(err);
        next(105);
    }
}

module.exports = {
    verifyAuth
}