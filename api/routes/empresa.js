const express = require('express');

const empresaController = require('../controller/empresa')

const router = express.Router();


router.post('/empresa', empresaController.findEmpresa);

router.post('/cadastrar-empresa', empresaController.postAddEmpresa);

module.exports = router