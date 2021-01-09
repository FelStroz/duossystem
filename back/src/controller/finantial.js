const Cars = require('../model/cars');
const views = require('../view/finantial');
const addSubtractDate = require("add-subtract-date");

module.exports = {
    getTotal: async (req, res) => {
        if (!req.users || !req.users.isAdmin) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        let {timestamp} = req.query, totalPayed = 0, now = new Date().toISOString(), pastDate = new Date();
        if (timestamp === "day")
            pastDate = new Date(pastDate.toLocaleDateString());
        else if (timestamp === "month")
            await addSubtractDate.subtract(pastDate, 1, "month");
        else if (timestamp === "year")
            await addSubtractDate.subtract(pastDate, 1, "year");
        else
            await addSubtractDate.subtract(pastDate, 1, "year");
        Cars.find({date: {$gte: pastDate.toISOString(), $lte: now}}).populate('client').then((services) => {
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
