const express = require('express');
const router = express.Router();
const upload = require('../../services/uploaderProducers');
const authMiddleware = require('../../middlewares/is-authMiddleware')
const producersActions = require('./producersActions');

router.get('/producers', producersActions.getAllProducers);

router.get('/producers/:_id', producersActions.getProducer);

router.post('/producers', authMiddleware, upload.single('logo'), producersActions.saveProducer);

router.put('/producers/:_id', authMiddleware, upload.single('logo'), producersActions.editProducer);

router.delete('/producers/:_id', authMiddleware, producersActions.deleteProducer);

router.get('/producers/:_id/deleteImg', authMiddleware, producersActions.deleteImage);

module.exports = router;