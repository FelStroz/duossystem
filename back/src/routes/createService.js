let express = require('express');
let routes = express.Router();
let service = require('../controller/cars');

const userMiddleware = require('../middleware/auth');

routes.use(userMiddleware);

routes.get('/', service.create);

module.exports = routes;
