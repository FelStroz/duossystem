const List = require('../model/getList');
const Plates = require('../model/plates');
const views = require('../view/plates');

module.exports = {
    getOne: async (req, res) => {
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        Plates.findOne({licensePlate: req.query.licensePlate}).populate('client').then(plate => {
            if (!plate) return views.error({"message": "Placa não cadastrada!"}, 200, "Not Found", res);
            return views.showOne(plate, res);
        }).catch((e) => views.error(e, 500, "error", res));
    }
}
