// EXPRESS
const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts')

// SET INDEX ROUTER
router.get('/', function (req, res, next) {
        res.render('pages/home')
});

// SET FORM ROUTER
router.get('/anamnese', function (req, res, next) {
        res.render('pages/form')
});

// SET DASHBOARD ROUTER
router.get('/ocorrencias', function (req, res, next) {
        res.render('pages/mapa')
});




module.exports = router;