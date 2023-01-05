const express = require('express');
const router = express.Router();

const upload = require('../../services/uploaderImageSlider');

const imageSliderActions = require('./imageSliderActions');

router.get('/imageSlider', imageSliderActions.getAllImages);

router.post('/imageSlider', upload.single('image'), imageSliderActions.saveImage);

router.delete('/imageSlider/:_id', imageSliderActions.deleteImage);

module.exports = router;