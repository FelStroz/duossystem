const schema = require('mongoose').Schema;
const {isDate, isMobilePhone} = require('validator');

let clientSchema = new schema({
    name: {type: String, maxlength: 70, required: true},
    birthday: {type: Date, validate: [isDate, 'Invalid format in date of the birthday! Please insert a valid date!'], required: true},
    instagram: {type: String},
    phone: {type: Number, validate: [isMobilePhone('pt-BR'), 'Invalid phone number'], required: true},
    address: {type: String},
    services: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cars'
    }],
    firstTime: {
        type: Date,
        default: Date.now
    }
}, {timestamp: true});

module.exports = mongoose.model("Client", clientSchema);
