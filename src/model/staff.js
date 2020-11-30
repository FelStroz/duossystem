const mongoose = require('mongoose');
const {isDate, isMobilePhone} = require('validator');

let StaffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 70,
        lowercase: true,
    },
    birthday: {
        type: Date,
        validate: [isDate, 'Invalid format in birthday! Please insert a valid date!'],
    },
    spending: [{
        value: {
            type: Number,
            default: 0,
        },
        reason: {
            type: String,
        }
    }],
    fouls: [{
        number: {
            type: Number,
            default: 0,
        },
        date: {
            type: Date,
            validate: [isDate, 'Invalid format in date of the foul! Please insert a valid date!'],
        }
    }],
    phone: {
        type: String,
        validate: [isMobilePhone, 'Invalid phone number'],
        unique: true,
    },
    profession: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Staff', StaffSchema);
