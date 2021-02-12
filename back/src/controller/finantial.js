const Cars = require('../model/cars');
const views = require('../view/finantial');

module.exports = {
    getTotal: async (req, res) => {
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        let {timestamp} = req.query, totalPayed = 0, now = new Date(), pastDate = new Date();
        if (timestamp === "day")
            pastDate = new Date(pastDate.toLocaleDateString());
        else if (timestamp === "month")
            pastDate = new Date(`${pastDate.getUTCMonth() + 1}-01-${pastDate.getUTCFullYear()}`)
        else if (timestamp === "year")
            pastDate = new Date(`01-01-${pastDate.getUTCFullYear()}`)
        else
            pastDate = new Date(`01-01-${pastDate.getUTCFullYear()}`)
        Cars.find({date: {$gte: pastDate, $lte: now}}).populate('client').then((services) => {
                services.map(item => {
                    item.service.map(service => {
                        totalPayed += service.price;
                    });
                });
                return views.showTotal({totalPayed, totalServices: services.length, services}, "Success", res);
            }
        ).catch((e) => views.error(e, 500, "error", res));
    },
}
