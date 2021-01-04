const Client = require('../model/clients');
const List = require('../model/getList');
const Cars = require('../model/cars');
const views = require('../view/client');

module.exports = {
    create: async (req, res) => {
        let {name, birthday, instagram, phone, address} = req.body;
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        let client = new Client({name, birthday, instagram, phone, address});
        client.save().then(client => {
            return views.created(client, "Created", res);
        }).catch((e) => views.error(e, 500, "error", res));
    },
    getOne: async (req, res) => {
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        Client.findById(req.params.id).populate(req.query.populate).then(client => {
            if (!client) return views.error({"message": "Cliente não encontrado!"}, 404, "Not Found", res);
            return views.showOne(client, res);
        }).catch((e) => views.error(e, 500, "error", res));
    },
    getList: async (req, res) => {
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        List(Client, req.query).then(({data, total}) =>
            views.showList(data, total, res)
        ).catch((e) => views.error(e, 500, "error", res));
    },
    update: async (req, res) => {
        let {id} = req.params;

        // let {services} = req.body
        // if (services[0] !== undefined)
        //     services.map(services =>
        //         Cars.findByIdAndUpdate(services._id, services, {new: true})
        //             .then(service => { if (!service) return views.error({"message": "Serviço não encontrado!"}, 404, "Not Found", res);})
        //             .catch((e) => {return res.json({error: e})})
        //     )

        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        Client.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        ).then(async client => {
            if (!client) return views.error({"message": "Cliente não encontrado!"}, 404, "Not Found", res);
            for (let position in req.body) {
                client[position] = req.body[position];
            }
            return views.showUpdated(client,"Updated", res);
        }).catch(e => res.json({error: e}));
    },
    delete: async (req, res) => {
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        Client.findByIdAndDelete(req.params.id).then(client => {
            if (!client) return views.error({"message": "Cliente não encontrado!"}, 404, "Not Found", res);
            if (client.services[0] !== undefined)
                client.services.map(service =>
                    Cars.findByIdAndDelete(service._id)
                        .then(car => { if (!car) return views.error({"message": "Serviço não encontrado!"}, 404, "Not Found", res)})
                        .catch((e) => views.error(e, 500, "error", res))
                )
            return views.showDeleted(client, "Deleted", res);
        }).catch(e => views.error(e, 500, "error", res));
    },
}
