let express = require('express');
let routes = express.Router();
let cars = require('../controller/cars');

const userMiddleware = require('../middleware/auth');

routes.use(userMiddleware);

routes.post('/', cars.create);
routes.get('/:id', cars.getOne);
routes.get('/', cars.getList);
routes.put('/:id', cars.update);
routes.delete('/:id', cars.delete);

module.exports = routes;
