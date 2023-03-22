const express = require('express');
const router = express.Router();

const upload = require('../../services/uploaderImageSlider');
const authMiddleware = require('../../middlewares/is-authMiddleware');

const imageSliderActions = require('./imageSliderActions');

router.get('/imageSlider', imageSliderActions.getAllImages);

router.post('/imageSlider', authMiddleware, upload.single('image'), imageSliderActions.saveImage);

router.delete('/imageSlider/:_id', authMiddleware, imageSliderActions.deleteImage);

module.exports = router;