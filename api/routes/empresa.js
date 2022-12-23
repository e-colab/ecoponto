const express = require('express');

const empresaController = require('../controller/empresa')

const router = express.Router();


router.get('/empresas', empresaController.getAddEmpresa);

router.post('/cadastrar-empresa', empresaController.postAddEmpresa);

module.exports = router