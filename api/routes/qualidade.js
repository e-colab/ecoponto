const express = require('express');

const qualidadeController = require('../controller/qualidade')

const router = express.Router();


router.get('/qualidades', qualidadeController.getQualidades);

router.post('/cadastrar-qualidade', qualidadeController.postQualidade);

module.exports = router