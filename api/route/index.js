const requestIp = require('request-ip');
// middleware
const tokenMiddle = require('../middleware/token.middle');
const authenMiddle = require('../middleware/authen.middle')
const ipClientMidlle = require('../middleware/ip_client.middle')
// routes
const registerRouter = require('./user/register.js')
const loginRouter = require('./login/login.js')
const logoutRouter = require('./logout/logout.js')
const forgotPasswordRouter = require('./user/forgot_password.js')
const userRouter = require('./user/user.js')
const adminRouter = require('./admin/admin')
const visitorRouter = require('./visitor/visitor.js')
const testRouter = require('./test/test.js')
const contactRouter = require('./contact/contact.js')

const registerRoutes = (app) => {
    app.use(requestIp.mw());
    app.use('/register', authenMiddle.verifyAuth, registerRouter)
    app.use('/login', ipClientMidlle.verifyIpClient, authenMiddle.verifyAuth, loginRouter)
    app.use('/forgot-password', forgotPasswordRouter)
    app.use('/user',  tokenMiddle.verifyToken, userRouter)
    app.use('/admin', tokenMiddle.verifyAdminToken, adminRouter)
    app.use('/logout', tokenMiddle.verifyToken, logoutRouter)
    app.use('/', visitorRouter)
    app.use('/test', testRouter)
    app.use('/contact', contactRouter)
}

module.exports = { 
    registerRoutes
};