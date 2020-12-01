const Client = require('../model/clients');
const List = require('../model/getList');

module.exports = {
    create: async (req, res) => {

        if(!req.users.isAdmin) return res.json({ error: 'unauthorized' });
        let client = new Client(req.body);
        client.save().then(client => {
            console.log("aqui")
            return res.json({status: "created", data: client});
        }).catch((e) => res.json({error: e.message}));
    },
    getOne: async (req, res) => {
        if(!req.users.isAdmin) return res.json({ error: 'unauthorized' });
        Client.findById(req.params.id).populate('services').then(client => {
            if(!Client) return res.json({ error: 'Not Found' });
            return res.json({status: "finded", data: client});
        }).catch((e) => res.json({error: e}));
    },
    getList: async (req, res) => {
        if(!req.users.isAdmin) return res.json({ error: 'unauthorized' });
        List(Client, req.query).then(({data, total}) =>
            res.status(200).json({
                data: data.map((item) => item),
                total
            })).catch((e) => res.json({error: e}));
    },

    //TODO: Colocar para atualizar os serviços quando passar o id de algum, buscar no banco e att;
    update: async (req, res) => { // ATUALIZAR OS SERVIÇOS A PARTIR DAQUI
        let {id} = req.params;
        if(!req.users.isAdmin) return res.json({ error: 'unauthorized' });
        Client.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        ).then(async client => {
            if(!client) return res.json({ error: 'Not Found' });
            for (let position in req.body) {
                client[position] = req.body[position];
            }
            return res.json({status: "updated", data: client});
        }).catch(e => res.json({error: e}));
    },
    delete: async (req, res) => {
        if(!req.users.isAdmin) return res.json({ error: 'unauthorized' });
        Client.findByIdAndDelete(req.params.id).then(client => {
            if(!client) return res.json({ error: 'Not Found' });
            return res.json({status: "deleted", data: client});
        }).catch(e => res.json({error: e}));
    },
}
