const mongoose = require('mongoose');

let PlatesSchema = new mongoose.Schema({
    licensePlate: {
        type: String,
        required: true,
        uppercase: true,
    },
    client: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Client'
    },
});

module.exports = mongoose.model('Plates', PlatesSchema);
