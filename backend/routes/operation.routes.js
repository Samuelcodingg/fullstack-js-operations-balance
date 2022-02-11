const express = require('express');
const router = express.Router();

const { create } = require('../controllers/operation.controller');

router.post('/create', create);

module.exports = router;