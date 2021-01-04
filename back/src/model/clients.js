const mongoose = require('mongoose');
const {isDate, isMobilePhone} = require('validator');

let ClientSchema = new mongoose.Schema({
    name: {type: String, maxlength: 70, required: true},
    birthday: {type: Date, validate: [isDate, 'Invalid format in date of the birthday! Please insert a valid date!'], required: true},
    instagram: {type: String},
    phone: {type: String, validate: [isMobilePhone, 'Invalid phone number'], required: true},
    address: {type: String},
    services: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cars'
    }],
    firstTime: {
        type: Date,
        default: Date.now
    },
}, {timestamps: true});

module.exports = mongoose.model("Client", ClientSchema);
