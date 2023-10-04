const express = require('express');
const router = express.Router();

const { upload, resizeImage } = require('../../services/uploaderFurniture');
const authMiddleware = require('../../middlewares/is-authMiddleware');
const uploadCSV = require('../../services/uploadCSV')

const furnitureActions = require('./furnitureActions');

router.get('/furniture', furnitureActions.getAllFurniture);

router.get('/furniture/:_id', furnitureActions.getPieceOfFurniture);

router.post('/furniture', authMiddleware, upload.single('image'), resizeImage, furnitureActions.saveFurniture);

router.put('/furniture/:_id', authMiddleware, upload.single('image'), resizeImage, furnitureActions.editFurniture);

router.delete('/furniture/:_id', authMiddleware, furnitureActions.deleteFurniture);

router.get('/furniture/:_id/deleteImg', authMiddleware, furnitureActions.deleteImage);

// router.post('/CSV/furniture/upload', authMiddleware, uploadCSV.single('csvFile'), furnitureActions.uploadCSV);

module.exports = router;
