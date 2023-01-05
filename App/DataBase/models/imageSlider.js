const mongoose = require('mongoose');

const ImageSliderSchema = new mongoose.Schema({
    image: {
        type: String
    },
    link: {
        type: String,
        required: true
    },
    isVissible: {
        type: Boolean,
        required: true
    }
});

const ImageSlider = mongoose.model('ImageSlider', ImageSliderSchema);

module.exports = ImageSlider;