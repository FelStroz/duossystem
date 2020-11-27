const routes = require('express').Router();

routes.use('/staff', require('./staff'));
routes.use('/users', require('./users'));
routes.use('/clients', require('./clients'));
routes.use('/cars', require('./cars'));

module.exports = routes;
