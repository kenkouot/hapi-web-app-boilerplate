#!/usr/bin/env node --use_strict

var Hapi = require('hapi');
var path = require('path');
var config = require('./config');

var localSettings = config.localSettings();

var app = {};

app.initialize = function () {
	var server = new Hapi.createServer(localSettings.host, localSettings.port, {
		// ez enable cross origin resource sharing
		cors: true,
		views: {
			engines: {
				html: 'handlebars'
			},
			isCached: process.env.NODE_ENV === 'production',
			layout: true,
			/*
			 * Helpers are functions usable from within handlebars templates.
			 * @example the getScripts helper can be used like: <script src="{{ getScripts 'foo.js' }}">
			 */
			helpersPath: path.join(__dirname, 'views', '_helpers'),
			path: path.join(__dirname, 'views'),
			partialsPath: path.join(__dirname, 'views', '_partials'),
		}
	});

	/*
	 * Import Routes
	 */
	require('./routes')(server);

	server.start(function () {
		console.log('Server started at: ' + server.info.uri);
	});
};

app.initialize();
