const schema = require('mongoose').Schema;
const {isDate} = require('validator');
const Client = require('./clients');

let carsSchema = new schema({
    client: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Client'
    },
    date: {type: Date, validate: [isDate, 'Invalid format in date of the birthday! Please insert a valid date!'], required: true},
    service: [{
        name: {type: String},
        price: {type: Number},
    }],
    paymentMethod: {type: String, required: true},
    status: {type: String, default: 'Em aberto'},
    licensePlate: {type: String, uppercase: true, required: true},
    carBrand: {type: String, required: true},
    protocol: {type: String, required: true},
    color: {type: String},
    observation: {type: String},
    discount: {type: Number},
}, {timestamp: true});

carsSchema.pre('save', async function (next) {
    let {_id: id, client: clientId} = this;

    await Client.findByIdAndUpdate(clientId, {'$push': {'services': id}}).catch(e => next(e));

    next();
});

module.exports = mongoose.model("Cars", carsSchema);
