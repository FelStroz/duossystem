let express = require('express');
let routes = express.Router();
let finantial = require('../controller/finantial');

const userMiddleware = require('../middleware/auth');

routes.use(userMiddleware);

routes.get('/', finantial.getTotal);

module.exports = routes;
