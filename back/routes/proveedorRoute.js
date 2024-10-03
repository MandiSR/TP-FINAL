const express = require('express');
const router = express.Router();
const controller = require('../controllers/proveedor');

router.get('/proveedor', controller.getAllProveedores);
router.post('/guardar', controller.createProveedor);
router.put('/modificar-proveedor/:id', controller.updateProveedor);
router.get('/proveedor/:id', controller.getProveedorById);
router.delete('/eliminar/:id', controller.deleteProveedor); 

module.exports = router;
