
// routes/champRoutes.js
const express = require('express');
const router = express.Router();
const champController = require('../controllers/champController');

router.get('/champs', champController.getAllChamps);
router.get('/champsById/:typeName', champController.getChampsByName);
router.post('/champs', champController.create)
module.exports = router;
