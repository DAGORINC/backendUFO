const mongoose = require('mongoose');

const ProducersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
    logo: {
        type: String,
        required: true
    }
});

const Producer = mongoose.model('Producer', ProducersSchema);

module.exports = Producer;