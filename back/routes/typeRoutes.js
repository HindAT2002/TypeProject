
// routes/typeRoutes.js
const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');

router.get('/types', typeController.getAllTypes);
router.post('/createType',typeController.create)
module.exports = router;