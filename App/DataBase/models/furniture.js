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
        type: Number,
    },
    isPriceVissible: {
        type: Boolean,
        default: false,
    },
    designedForTheLivingRoom: {
        type: Boolean,
        default: false,
    },
    designedForTheKitchen: {
        type: Boolean,
        default: false,
    },
    designedForTheBedroom: {
        type: Boolean,
        default: false,
    },
    designedForTheOffice: {
        type: Boolean,
        default: false,
    },
    designedForTheYouthRoom: {
        type: Boolean,
        default: false,
    },
    designedForTheHallway: {
        type: Boolean,
        default: false,
    },
    designedForTheChildrensRoom: {
        type: Boolean,
        default: false,
    },
    designedForTheBathroom: {
        type: Boolean,
        default: false,
    },
    categories: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

const Furniture = mongoose.model('Furniture', FurnitureSchema);

module.exports = Furniture;