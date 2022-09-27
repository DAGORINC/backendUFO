const mongoose = require('mongoose');

const FurnitureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    producer: {
        type: String,
        required: true,
    },
    partCollection: {
        type: String,
    },
    price: {
        type: Number,
    },
    width: {
        type: Number,
    },
    depth: {
        type: Number,
    },
    height: {
        type: Number,
    },
    crossed: {
        type: String,
    },
    isPriceVissible: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        required: true,
    }
});

const Furniture = mongoose.model('Furniture', FurnitureSchema);

module.exports = Furniture;