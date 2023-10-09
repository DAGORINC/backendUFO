const express = require('express');
const router = express.Router();
const storageActions = require('../controllers/storageActions');
const authMiddleware = require('../middlewares/is-authMiddleware');

// Endpoint do pobierania folderu storage
router.get('/storage/download', storageActions.checkStorageFolder, storageActions.downloadStorageFolder);

module.exports = router;