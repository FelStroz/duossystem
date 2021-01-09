const Cars = require('../model/cars');
const List = require('../model/getList');
const Client = require('../model/clients');
const views = require('../view/cars');
const {manageProtocol} = require('../middleware/protocol');

module.exports = {
    create: async (req, res) => {
        let {client, date, service, paymentMethod, licensePlate, carBrand, color, observation, discount} = req.body;
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        let protocol = await manageProtocol();
        let cars = new Cars({client, date, service, paymentMethod, licensePlate, carBrand, protocol, color, observation, discount});
        cars.save().then(car => {
            return views.created(car, "Created", res);
        }).catch((e) => views.error(e, 500, "error", res));
    },
    getOne: async (req, res) => {
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        Cars.findById(req.params.id).populate('client').then(car => {
            if (!car) return views.error({"message": "Serviço não encontrado!"}, 404, "Not Found", res);
            return views.showOne(car, res);
        }).catch((e) => views.error(e, 500, "error", res));
    },
    getList: async (req, res) => {
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        List(Cars, req.query).then(({data, total}) =>
            views.showList(data, total, res)
        ).catch((e) => views.error(e, 500, "error", res));
    },
    update: async (req, res) => {
        let {id} = req.params;
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        Cars.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        ).populate('client').then(async cars => {
            if (!cars) return views.error({"message": "Serviço não encontrado!"}, 404, "Not Found", res);

            for (let position in req.body)
                cars[position] = req.body[position];

            return views.showUpdated(cars,"Updated", res);
        }).catch(e => res.json({error: e}));
    },
    delete: async (req, res) => {
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        Cars.findByIdAndDelete(req.params.id).then(cars => {
            if (!cars) return views.error({"message": "Serviço não encontrado!"}, 404, "Not Found", res);

            Client.findByIdAndUpdate(cars.client, {$pull: {services: req.params.id}}).then(client => {
                if (!client) return views.error({"message": "Cliente não encontrado!"}, 404, "Not Found", res);
                return views.showDeleted(cars, "Deleted", res);
            }).catch(e => views.error(e, 500, "error", res));

        }).catch(e => views.error(e, 500, "error", res));
    },
}
