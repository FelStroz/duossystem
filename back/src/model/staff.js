const mongoose = require('mongoose');
const {isDate} = require('validator');

let StaffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 70,
        unique: true
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
        reason: {
            type: String,
        },
        date: {
            type: Date,
            validate: [isDate, 'Invalid format in date of the foul! Please insert a valid date!'],
        }
    }],
    phone: {
        type: String,
        unique: true,
    },
    profession: {
        type: String,
        required: true,
    },
    actualStatus: {
      type: String,
      required: true,
      default: 'Ativo'
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Staff', StaffSchema);
