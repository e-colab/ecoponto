const express = require('express');

const materialController = require('../controller/material')

const router = express.Router();


router.post('/material', materialController.retrieveMaterial);

router.post('/material', materialController.postMaterial);

module.exports = router