const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/is-authMiddleware');
const userActions = require ('../controllers/userActions')

router.post('/register', userActions.register);

module.exports = router;