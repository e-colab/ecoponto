const express = require('express');

const materialController = require('../controller/material')

const router = express.Router();


router.get('/materiais', materialController.getMaterial);

router.post('/cadastrar-material', materialController.postMaterial);

module.exports = router