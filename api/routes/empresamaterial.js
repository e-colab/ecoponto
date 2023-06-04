const express = require('express');

const empresamaterialController = require('../controller/empresamaterial')

const router = express.Router();


router.post('/empresamaterial', empresamaterialController.findEmpresaMaterial);

module.exports = router