let express = require('express');
let routes = express.Router();
let staff = require('../controller/staff');

const userMiddleware = require('../middleware/auth');

routes.use(userMiddleware);

routes.post('/', staff.create);
routes.get('/:id', staff.getOne);
routes.get('/', staff.getList);
routes.put('/:id', staff.update);
routes.delete('/:id', staff.delete);

module.exports = routes;
