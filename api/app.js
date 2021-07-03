const express = require('express')
const app = express();
const error = require('./shared/helpers/errorHandle.helper');
const mongoose = require('mongoose');
require('dotenv').config()
/**
 * Initialize
 */
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static("./public"))

// configure middlewares
const middlewares = require('./middleware');
middlewares.configureMiddlewares(app);
// router
const routes = require('./route');
routes.registerRoutes(app)
// error
app.use(error.handleError);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.db_url, JSON.parse(process.env.db_options));
mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});
mongoose.connection.on('connected', async () => {
	console.log('MongoDB connected');
	/**
	 * Run app
	 */
	const server = require('http').Server(app)
	server.listen(process.env.port, () => {
			console.log(`Server api running at http://localhost:${process.env.port}`)
	})
});
