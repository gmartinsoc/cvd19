// EXPRESS
const express = require('express');


const router = express.Router();

const controller = require('../controllers/OcorrenciasController')

router.get('/ocorrencias/data', controller.get);
router.post('/cadastrar', controller.post);




module.exports = router;