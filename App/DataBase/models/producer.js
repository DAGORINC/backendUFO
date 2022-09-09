const mongoose = require('mongoose');

const ProducerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
});

const Producer = mongoose.model('Producer', ProducerSchema);

module.exports = Producer;