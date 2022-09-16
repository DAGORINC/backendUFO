const express = require('express');
const router = express.Router();

const upload = require('../../services/uploaderProducers');

const producersActions = require('./producersActions');

router.get('/producers', producersActions.getAllProducers);

router.get('/producers/:_id', producersActions.getProducer);

router.post('/producers', upload.single('logo'), producersActions.saveProducer);

router.put('/producers/:_id', upload.single('logo'), producersActions.editProducer);

router.delete('/producers/:_id', producersActions.deleteProducer);

router.get('/producers/:_id/deleteImg', producersActions.deleteImage);

module.exports = router;