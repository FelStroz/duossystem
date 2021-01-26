let express = require('express');
let routes = express.Router();
let plates = require('../controller/plates');

const userMiddleware = require('../middleware/auth');

routes.use(userMiddleware);

routes.get('/', plates.getOne);

module.exports = routes;
