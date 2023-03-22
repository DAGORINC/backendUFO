const express = require('express');
const router = express.Router();

const { upload, resizeImage } = require('../../services/uploaderPromotionalFurniture');
const authMiddleware = require('../../middlewares/is-authMiddleware');

const promotionalFurnitureActions = require('./promotionalFurnitureActions');

router.get('/promotionalFurniture', promotionalFurnitureActions.getAllFurniture);

router.get('/promotionalFurniture/:_id', promotionalFurnitureActions.getPieceOfFurniture);

router.post('/promotionalFurniture', authMiddleware, upload.single('image'), resizeImage, promotionalFurnitureActions.saveFurniture);

router.put('/promotionalFurniture/:_id', authMiddleware, upload.single('image'), resizeImage, promotionalFurnitureActions.editFurniture);

router.delete('/promotionalFurniture/:_id', authMiddleware, promotionalFurnitureActions.deleteFurniture);

module.exports = router;