const express = require('express');
const error404Action = require('../action/error404Action');
const router = express.Router();

router.use(error404Action);

module.exports = router;