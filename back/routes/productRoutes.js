// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer=require('multer')

const storage = multer.memoryStorage(); 

const upload = multer({ storage: storage });


router.get('/products', productController.getAllProducts);
router.post('/products',upload.single('image'), productController.createProduct);

module.exports = router;
