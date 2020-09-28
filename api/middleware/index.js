'use strict';
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const configCommon = require('../shared/helpers/configCommon.helper')
const _ = require('lodash');

const configureMiddlewares = (app) => {
    //Middlewares
    app.use(function (req, res, next) {
        //console.log('ip', req.ip, req.headers.host, req.get('host'), req.get('origin'))
        if (configCommon.getWhiteList() != '*') {
            let org = req.get('origin');
            let ip = req.ip.replace('::ffff:', '');
            if (!(_.find(configCommon.getWhiteList(), (o) => {
                return o == org;
            }) || _.find(configCommon.getWhiteList(), (o) => {
                return o == ip;
            }))) {
                next(100);
            }
        }
        next();
    })
        .options('*', cors())
    //show console
    app.use(morgan("combined"));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors({
        origin: configCommon.getWhiteList(),
        //origin: /\.muv-x\.com$/,
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        // allowedHeaders: [],
        preflightContinue: true
    }))
    app.use(function(req, res, next) {
        req.setTimeout(0) // no timeout for all requests, your server will be DoS'd 
        next() 
    })
}

module.exports = {
    configureMiddlewares
}