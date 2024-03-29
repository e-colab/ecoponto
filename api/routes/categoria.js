const express = require('express');

const categoriaController = require('../controller/categoria')

const router = express.Router();


router.get('/categorias', categoriaController.getCategorias);

router.post('/categorias', categoriaController.postCategoria);

module.exports = router