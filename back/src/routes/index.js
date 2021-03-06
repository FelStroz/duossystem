const routes = require('express').Router();

routes.use('/staff', require('./staff'));
routes.use('/admin/users', require('./users'));
routes.use('/clients', require('./clients'));
routes.use('/cars', require('./cars'));
routes.use('/login', require('./auth'));
routes.use('/finantial', require('./finantial'));
routes.use('/plates', require('./plates'));

module.exports = routes;
