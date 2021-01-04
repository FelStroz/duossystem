const routes = require('express').Router();

routes.use('/staff', require('./staff'));
routes.use('/admin/users', require('./users'));
routes.use('/clients', require('./clients'));
routes.use('/cars', require('./cars'));
routes.use('/login', require('./auth'));

module.exports = routes;
