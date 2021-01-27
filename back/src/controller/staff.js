const Staff = require('../model/staff');
const List = require('../model/getList');
const views = require('../view/staff');
const {validateUpdate} = require('../middleware/validation');

module.exports = {
    create: async (req, res) => {
        let {name, birthday, spending, fouls, phone, profession, actualStatus} = req.body;
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        let staff = new Staff({name, birthday, spending, fouls, phone, profession, actualStatus});
        staff.save().then(staff => {
            return views.created(staff, "Created", res);
        }).catch((e) => views.error(e, 500, "error", res));
    },
    getOne: async (req, res) => {
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        Staff.findById(req.params.id).then(staff => {
            if (!staff) return views.error({"message": "Trabalhador não encontrado!"}, 404, "Not Found", res);
            return views.showOne(staff, res);
        }).catch((e) => views.error(e, 500, "error", res));
    },
    getList: async (req, res) => {
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        List(Staff, req.query).then(({data, total}) =>
            views.showList(data, total, res)
        ).catch((e) => views.error(e, 500, "error", res));
    },
    update: async (req, res) => {
        let {id} = req.params;
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);

        await validateUpdate(req.body);

        Staff.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        ).then(async staff => {
            if (!staff) return views.error({"message": "Trabalhador não encontrado!"}, 404, "Not Found", res);
            for (let position in req.body) {
                staff[position] = req.body[position];
            }
            return views.showUpdated(staff,"Updated", res);
        }).catch(e => views.error(e, 500, "error", res));
    },
    delete: async (req, res) => {
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        Staff.findByIdAndDelete(req.params.id).then(staff => {
            if (!staff) return views.error({"message": "Trabalhador não encontrado!"}, 404, "Not Found", res);
            return views.showDeleted(staff, "Deleted", res);
        }).catch(e => views.error(e, 500, "error", res));
    },
}
