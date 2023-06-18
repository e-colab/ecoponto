const express = require('express');

const localizacaoController = require('../controller/localizacao')

const router = express.Router();

router.post('/alterarlocal', localizacaoController.alterarLocalizacao);

module.exports = router