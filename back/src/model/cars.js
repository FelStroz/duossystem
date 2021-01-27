const mongoose = require('mongoose');
const {isDate} = require('validator');
const Client = require('./clients');

let CarsSchema = new mongoose.Schema({
    client: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Client'
    },
    nameClient: {
        type: String,
    },
    date: {type: Date, validate: [isDate, 'Invalid format in date of the birthday! Please insert a valid date!'], required: true},
    service: [{
        name: {type: String, required: true},
        price: {type: Number, required: true},
    }],
    paymentMethod: {type: String, default: "A definir"},
    status: {type: String, default: 'Em aberto'},
    licensePlate: {type: String, uppercase: true, required: true},
    carBrand: {type: String, required: true},
    protocol: {type: Number, default: 0},
    color: {type: String},
    observation: {type: String, default:"Sem observação"},
    discount: {type: Number , default: 0},
}, {timestamps: true});

CarsSchema.pre('save', async function (next) {
    let {_id: id, client: clientId} = this;

    await Client.findByIdAndUpdate(clientId, {'$push': {'services': id}}).catch(e => next(e));

    next();
});

module.exports = mongoose.model("Cars", CarsSchema);
