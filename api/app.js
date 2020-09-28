const express = require('express')
const app = express();
const i18n = require('i18n');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const configCommon = require('./shared/helpers/configCommon.helper')
const error = require('./shared/helpers/errorHandle.helper');

const swaggerTools = require('./doc')

// const http = require('http').Server(app);
const port = process.env.PORT || 8009;
/**
 * Initialize
 */
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static("./public"))
// firebase
admin.initializeApp({
    credential: admin.credential.cert(configCommon.getGoogleCloud().keyfile),
    databaseURL: configCommon.getGoogleCloud().databaseURL,
    storageBucket: configCommon.getGoogleCloud().storageBucket
});
const settings = {timestampsInSnapshots: true};
admin.firestore().settings(settings);

// SwaggerRouter configuration
swaggerTools.initSwaggerTools(app)
// configure middlewares
const middlewares = require('./middleware');
middlewares.configureMiddlewares(app);
// router
const routes = require('./route');
routes.registerRoutes(app)
// error
app.use(error.handleError);
// multi language
i18n.configure({
    locales: ['en', 'ja'],
    directory: `${__dirname}/config/locales`,
});
/**
 * Run app
 */
// if (process.env.MODE_BUILD == 'prod') {
//     var https = require('https');
//     var options = {
//         key: fs.readFileSync('/etc/letsencrypt/live/harseq.com/privkey.pem'),
//         cert: fs.readFileSync('/etc/letsencrypt/live/harseq.com/fullchain.pem'),
//         //  requestCert: true,
//         // rejectUnauthorized: false
//     };
//     https.createServer(options, app).listen(port, () => {
//         console.log(`Server running at http://:${port}/`)
//     });
// } else {
//     http.listen(port, () => {
//         console.log(`Server running at http://:${port}/`)
//     });
// }
app.listen(port)
console.log('Api doc is available on http://localhost:%d/docs', port);

module.exports = app;