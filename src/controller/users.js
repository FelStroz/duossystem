const Users = require('../model/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: async (req, res) => {
        let { name, email, password, isAdmin } = req.body;
        if (!isAdmin && !req.header.token) return res.json({ error: 'unauthorized' });
        let user = new Users({ name, email, password, isAdmin });
        user.save().then(user => {
            return res.json({status: "created", data: user});
        }).catch((e) => res.json({error: e}));
    },
    getOne: async (req, res) => {
        if(!req.header.token) return res.json({ error: 'unauthorized' });
        Users.findById(req.params.id).then(user => {
            if(!user) return res.json({ error: 'Not Found' });
            return res.json({status: "finded", data: user});
        }).catch((e) => res.json({error: e}));
    },
    getList: async (req, res) => {

    },
    update: async (req, res) => {
        let {id} = req.params;
        Users.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        ).then(async user => {
            if(!user) return res.json({ error: 'Not Found' });
            for (let position in req.body) {
                user[position] = req.body[position];
            }
            return res.json({status: "updated", data: user});
        }).catch(e => res.json({error: e}));
    },
    delete: async (req, res) => {
        if(!req.header.token) return res.json({ error: 'unauthorized' });
        Users.findByIdAndDelete(req.params.id).then(user => {
            if(!user) return res.json({ error: 'Not Found' });
            return res.json({status: "deleted", data: user});
        }).catch(e => res.json({error: e}));
    },
    login: async (req, res) => {
        let { email, password } = req.body;
        if(!email || !password) return res.json({ error: 'unauthorized' });

        Users.findOne({ '$or': [{ 'email': email }, { 'name': email }] }).then(async user => {
            if(!user) return res.json({ error: 'Not Found' });
            if(!await bcrypt.compare(password, user.password)) return res.json(({ status: 401, key: 'incorrectPassword' }));
            return res.json({
                user,
                token: jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET)
            })
        }).catch(e => res.json({error: e}));
    }
}
