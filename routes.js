var path = require('path');

module.exports = function (server) {
	server.route({
		method: 'GET',
		path: '/{path*}',
		handler: {
			directory: {
				path: path.join(__dirname, '.tmp/public'),
				listing: false,
				index: false
			}
		}
	});

	// Base route
	server.route({
		method: 'GET',
		path: '/',
		handler: require('./controllers/home')
			.index
	});
};
