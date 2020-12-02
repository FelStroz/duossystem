const Staff = require('../model/staff');
const List = require('../model/getList');

module.exports = {
    create: async (req, res) => {
        if(!req.users.isAdmin) return res.json({ error: 'unauthorized' });
        let user = new Staff(req.body);
        user.save().then(staff => {
            return res.json({status: "created", data: staff});
        }).catch((e) => res.json({error: e.message}));
    },
    getOne: async (req, res) => {
        if(!req.users.isAdmin) return res.json({ error: 'unauthorized' });
        Staff.findById(req.params.id).then(staff => {
            if(!staff) return res.json({ error: 'Not Found' });
            return res.json({status: "finded", data: staff});
        }).catch((e) => res.json({error: e}));
    },
    getList: async (req, res) => {
        if(!req.users.isAdmin) return res.json({ error: 'unauthorized' });
        List(Staff, req.query).then(({data, total}) =>
            res.status(200).json({
                data: data.map((item) => item),
                total
            })).catch((e) => res.json({error: e}));
    },
    update: async (req, res) => {
        let {id} = req.params;
        if(!req.users.isAdmin) return res.json({ error: 'unauthorized' });
        Staff.findByIdAndUpdate(
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
        if(!req.users.isAdmin) return res.json({ error: 'unauthorized' });
        Staff.findByIdAndDelete(req.params.id).then(user => {
            if(!user) return res.json({ error: 'Not Found' });
            return res.json({status: "deleted", data: user});
        }).catch(e => res.json({error: e}));
    },
}
