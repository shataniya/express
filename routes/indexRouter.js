const express = require('express');
const router = express.Router();

// actions
const indexAction = require('../action/indexRouterAction/indexAction');

router.get('/', indexAction);

module.exports = router;
