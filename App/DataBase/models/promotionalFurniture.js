const mongoose = require('mongoose');

const PromotionalFurnitureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    width: {
        type: Number,
        default: 0,
    },
    depth: {
        type: Number,
        default: 0,
    },
    height: {
        type: Number,
        default: 0,
    },
    crossed: {
        type: Number,
        default: 0,
    },
    isPriceVissible: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

const PromotionalFurniture = mongoose.model('PromotionalFurniture', PromotionalFurnitureSchema);

module.exports = PromotionalFurniture;