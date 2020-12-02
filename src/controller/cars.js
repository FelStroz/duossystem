const Cars = require('../model/cars');
const List = require('../model/getList');

module.exports = {
    create: async (req, res) => {
        if (!req.users.isAdmin) return res.json({error: 'unauthorized'});
        let cars = new Cars(req.body);
        cars.save().then(car => {
            return res.json({status: "created", data: car});
        }).catch((e) => res.json({error: e.message}));
    },
    getOne: async (req, res) => {
        if (!req.users.isAdmin) return res.json({error: 'unauthorized'});
        Cars.findById(req.params.id).populate('client').then(cars => {
            if (!cars) return res.json({error: 'Not Found'});
            return res.json({status: "finded", data: cars});
        }).catch((e) => res.json({error: e}));
    },
    getList: async (req, res) => {
        if (!req.users.isAdmin) return res.json({error: 'unauthorized'});
        List(Cars, req.query).then(({data, total}) =>
            res.status(200).json({
                data: data.map((item) => item),
                total
            })).catch((e) => res.json({error: e}));
    },
    update: async (req, res) => { // ATUALIZAR OS SERVIÇOS A PARTIR DAQUI
        let {id} = req.params;
        if (!req.users.isAdmin) return res.json({error: 'unauthorized'});
        Cars.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        ).then(async cars => {
            if (!cars) return res.json({error: 'Not Found'});
            for (let position in req.body) {
                cars[position] = req.body[position];
            }
            return res.json({status: "updated", data: cars});
        }).catch(e => res.json({error: e}));
    },
    delete: async (req, res) => {
        if (!req.users.isAdmin) return res.json({error: 'unauthorized'});
        Cars.findByIdAndDelete(req.params.id).then(cars => {
            if (!cars) return res.json({error: 'Not Found'});
            // if (client.services[0] !== undefined)
            //     client.services.map(service =>
            //         Cars.findByIdAndDelete(service._id)
            //             .then(client => { if (!client) return res.json({error: 'Not Found'})})
            //             .catch((e) => {return res.json({error: e})})
            //     )
            return res.json({status: "deleted", data: cars});
        }).catch(e => res.json({error: e}));
    },
}
