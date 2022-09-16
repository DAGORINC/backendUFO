const express = require('express');
const router = express.Router();

const upload = require('../../services/uploaderCollections');

const collectionsActions = require('./collectionsActions');

router.get('/collections', collectionsActions.getAllCollections);

router.get('/collections/:_id', collectionsActions.getCollection);

router.post('/collections', upload.single('image'), collectionsActions.saveCollection);

router.put('/collections/:_id', upload.single('image'), collectionsActions.editCollection);

router.delete('/collections/:_id', collectionsActions.deleteCollection);

router.get('/collections/:_id/deleteImg', collectionsActions.deleteImage);

module.exports = router;