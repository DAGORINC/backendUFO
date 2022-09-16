const mongoose = require('mongoose');

const CollectionsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    producer: {
        type: String,
        required: true
    },
    image: {
        type: String,
        requqired: true
    }
});

const Collections = mongoose.model('Collections', CollectionsSchema);

module.exports = Collections;