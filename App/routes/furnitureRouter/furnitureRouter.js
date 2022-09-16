const express = require('express');
const router = express.Router();

const upload = require('../../services/uploaderFurniture');

const furnitureActions = require('./furnitureActions');

router.get('/furniture', furnitureActions.getAllFurniture);

router.get('/furniture/:_id', furnitureActions.getPieceOfFurniture);

router.post('/furniture', upload.single('image'), furnitureActions.saveFurniture);

router.put('/furniture/:_id', upload.single('image'), furnitureActions.editFurniture);

router.delete('/furniture/:_id', furnitureActions.deleteFurniture);

router.get('/furniture/:_id/deleteImg', furnitureActions.deleteImage);

module.exports = router;