// EXPRESS
const express = require('express');


const router = express.Router();

const controller = require('../controllers/OcorrenciasController')

const connectDB = require('../database').connectDB

router.get('/ocorrencias/data', connectDB, controller.get);
router.post('/cadastrar', connectDB, controller.post);




module.exports = router;