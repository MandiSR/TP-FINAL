const express = require('express');
const router = express.Router();

const controller = require('../controllers/producto');

router.get('/el-producto', controller.getAllProductos)
router.post('/guardar', controller.createProducto)
router.put('/modificar-producto/:id', controller.getProductoById)
router.get('/el-producto/:id', controller.getProductoById)
router.delete('/eliminar/:id', controller.deleteProducto)

module.exports = router;