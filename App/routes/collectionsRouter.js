const express = require('express');
const router = express.Router();

const upload = require('../services/uploaderCollections');
const authMiddleware = require('../middlewares/is-authMiddleware');

const collectionsActions = require('../controllers/collectionsActions');

router.get('/collections', collectionsActions.getAllCollections);

router.get('/collections/:_id', collectionsActions.getCollection);

router.post('/collections', authMiddleware, upload.single('image'), collectionsActions.saveCollection);

router.put('/collections/:_id', authMiddleware, upload.single('image'), collectionsActions.editCollection);

router.delete('/collections/:_id', authMiddleware, collectionsActions.deleteCollection);

router.get('/collections/:_id/deleteImg', authMiddleware, collectionsActions.deleteImage);

module.exports = router;