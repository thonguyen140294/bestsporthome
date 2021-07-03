'use strict';
const cors = require('cors');
const express = require('express')
const morgan = require('morgan');

const configureMiddlewares = (app) => {
    //Middlewares
    app.use(function (req, res, next) {
        //console.log('ip', req.ip, req.headers.host, req.get('host'), req.get('origin'))
        if (process.env.whitelist != '*') {
            let org = req.get('origin');
            let ip = req.ip.replace('::ffff:', '');
            if (!process.env.whitelist.includes(org) && !process.env.whitelist.includes(ip)) {
                next(100);
            }
        }
        next();
    })
        .options('*', cors())
    //show console
    app.use(morgan("combined"));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors({
        origin: process.env.whitelist,
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