let express = require('express');
let routes = express.Router();
let clients = require('../controller/clients');

routes.post('/', clients.create);
routes.get('/:id', clients.getOne);
routes.get('/', clients.getList);
routes.put('/:id', clients.update);
routes.delete('/:id', clients.delete);

module.exports = routes;
