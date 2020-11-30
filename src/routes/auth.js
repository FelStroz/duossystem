const routes = require('express').Router();
const users = require('../controller/users');

routes.post('/', users.login);

module.exports = routes;
