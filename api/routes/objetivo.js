const express = require('express');

const objetivoController = require('../controller/objetivo')

const router = express.Router();


router.get('/objetivos', objetivoController.getObjetivos);

router.post('/objetivos', objetivoController.postObjetivo);

module.exports = router