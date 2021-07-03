const requestIp = require('request-ip');
// middleware
const tokenMiddle = require('../middleware/token.middle');
const ipClientMidlle = require('../middleware/ip_client.middle')
// routes
const accountRouter = require('./account')
const userRouter = require('./user')
const adminRouter = require('./admin')

const registerRoutes = (app) => {
    app.use(requestIp.mw());
    app.use('/user', ipClientMidlle.verifyIpClient, userRouter)
    app.use('/account',  tokenMiddle.verifyToken, accountRouter)
    app.use('/admin', tokenMiddle.verifyAdminToken, adminRouter)
}

module.exports = { 
    registerRoutes
};