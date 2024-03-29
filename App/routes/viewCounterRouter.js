const express = require('express');
const router = express.Router();

const viewCounterActions = require('../controllers/viewCounterActions');

router.get('/viewCounter', viewCounterActions.getViewCount);

router.post('/viewCounter', viewCounterActions.newView);


module.exports = router;