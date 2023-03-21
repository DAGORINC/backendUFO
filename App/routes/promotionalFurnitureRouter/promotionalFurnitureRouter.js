const express = require('express');
const router = express.Router();

const { upload, resizeImage } = require('../../services/uploaderPromotionalFurniture');

const promotionalFurnitureActions = require('./promotionalFurnitureActions');

router.get('/promotionalFurniture', promotionalFurnitureActions.getAllFurniture);

router.get('/promotionalFurniture/:_id', promotionalFurnitureActions.getPieceOfFurniture);

router.post('/promotionalFurniture', upload.single('image'), resizeImage, promotionalFurnitureActions.saveFurniture);

router.put('/promotionalFurniture/:_id', upload.single('image'), resizeImage, promotionalFurnitureActions.editFurniture);

router.delete('/promotionalFurniture/:_id', promotionalFurnitureActions.deleteFurniture);

module.exports = router;