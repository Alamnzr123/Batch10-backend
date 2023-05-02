const express = require('express');

const { addProduct, updateProduct, destroyProduct, getAllProduct, paginate, getByID } = require('../controller/product.controller');
const router = express.Router();
// redis
const { hitProductAll } = require('../middleware/redis');

// CRUD
router.post('/addProduct', addProduct);
router.put('/updateProduct', updateProduct);
router.delete('/deleteProduct/:id', destroyProduct);
router.get('/getProduct', getAllProduct);

// pagination
router.get('/pagination', paginate);

// REDIS
router.get('/v1/getFromRedis/:id', hitProductAll, getByID);


module.exports = router;