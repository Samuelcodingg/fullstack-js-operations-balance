const express = require('express');
const router = express.Router();

const { create, listById } = require('../controllers/operation.controller');

router.post('/create', create);
router.get('/list/:id', listById);

module.exports = router;