const Users = require('../model/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const List = require('../model/getList');
const views = require('../view/users');
const {validateUpdate} = require('../middleware/validation');

module.exports = {
    create: async (req, res) => {
        let {name, email, password, isAdmin} = req.body;
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        let user = new Users({name, email, password, isAdmin});
        user.save().then(user => {
            return views.created(user, "Created", res);
        }).catch((e) => views.error(e, 400, "error", res));
    },
    getOne: async (req, res) => {
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        Users.findById(req.params.id).then(user => {
            if (!user) return views.error({"message": "Usuário não encontrado!"}, 404, "Not Found", res);
            return views.showOne(user, res);
        }).catch((e) => views.error(e, 500, "error", res));
    },
    getList: async (req, res) => {
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        List(Users, req.query).then(({data, total}) =>
            views.showList(data, total, res)
        ).catch((e) => views.error(e, 500, "error", res));
    },
    update: async (req, res) => {
        let {id} = req.params;
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);

        await validateUpdate(req.body);

        Users.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        ).then(async user => {
            if (!user) return views.error({"message": "Usuário não encontrado!"}, 404, "Not Found", res);
            for (let position in req.body) {
                user[position] = req.body[position];
            }
            return views.showUpdated(user,"Updated", res);
        }).catch(e => views.error(e, 500, "error", res));
    },
    delete: async (req, res) => {
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        Users.findByIdAndDelete(req.params.id).then(user => {
            if (!user) return views.error({"message": "Usuário não encontrado!"}, 404, "Not Found", res);
            return views.showDeleted(user, "Deleted", res);
        }).catch(e => views.error(e, 500, "error", res));
    },
    login: async (req, res) => {
        let {email, password} = req.body;
        if (!email || !password) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);

        Users.findOne({'$or': [{'email': email}, {'name': email}]}).then(async user => {

            if (!user) return views.error({"message": "Usuário não encontrado!"}, 404, "Not Found", res);
            if (!await bcrypt.compare(password, user.password)) return views.error({"message": "Senha incorreta!"}, 403, "Forbidden", res);

            user.authToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.TOKEN_SECRET);
            delete user.password;
            return views.logged(user, res);
        }).catch(e => views.error(e, 500, "error", res));
    }
}
