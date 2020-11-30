const schema = require('mongoose').Schema;
const {isDate, isMobilePhone} = require('validator');

let staffSchema = new schema({
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
            required: true,
            validate: [isDate, 'Invalid format in date of the foul! Please insert a valid date!'],
        }
    }],
    phone: {
        type: Number,
        validate: [isMobilePhone('pt-BR'), 'Invalid phone number'],
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


module.exports = mongoose.model('Staff', staffSchema);
