const Cars = require('../model/cars');
const List = require('../model/getList');

module.exports = {
    create: async (req, res) => {
        if (!req.users.isAdmin) return res.json({error: 'unauthorized'});
        let cars = new Cars(req.body);
        cars.save().then(car => {
            console.log("aqui")
            return res.json({status: "created", data: car});
        }).catch((e) => res.json({error: e.message}));
    },
    getOne: async (req, res) => {

    },
    getList: async (req, res) => {
        if (!req.users.isAdmin) return res.json({error: 'unauthorized'});
        List(Cars, req.query).then(({data, total}) =>
            res.status(200).json({
                data: data.map((item) => item),
                total
            })).catch((e) => res.json({error: e}));
    },
    update: async (req, res) => {

    },
    delete: async (req, res) => {

    }
}
