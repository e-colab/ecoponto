const express = require('express');

const objetivoController = require('../controller/objetivo')

const router = express.Router();


router.get('/objetivos', objetivoController.getObjetivos);

router.post('/cadastrar-objetivo', objetivoController.postObjetivo);

module.exports = router