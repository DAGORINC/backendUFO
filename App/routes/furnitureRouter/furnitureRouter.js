const express = require('express');
const router = express.Router();

const { upload, resizeImage } = require('../../services/uploaderFurniture');

const furnitureActions = require('./furnitureActions');

router.get('/furniture', furnitureActions.getAllFurniture);

router.get('/furniture/:_id', furnitureActions.getPieceOfFurniture);

router.post('/furniture', upload.single('image'), resizeImage, furnitureActions.saveFurniture);

router.put('/furniture/:_id', upload.single('image'), resizeImage, furnitureActions.editFurniture);

router.delete('/furniture/:_id', furnitureActions.deleteFurniture);

router.get('/furniture/:_id/deleteImg', furnitureActions.deleteImage);

module.exports = router;
