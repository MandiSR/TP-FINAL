const connection = require("../connectDB/dBconnection");

function getAllProductos(req, res) {
    const query = "SELECT * FROM producto";

    connection.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error retrieving products from database");
        }
        res.json(result); // Enviar el resultado si no hay error
    });
}

function createProducto(req, res) {
    const { nombre, nombre_comercial, precio_venta, proveedor_id, precio_compra } = req.body; 
    const fotoProducto = req.file ? `../uploads/${req.file.filename}` : null; 

    // Validar que los campos no sean nulos
    if (!nombre || !nombre_comercial || !precioVenta || !proveedor_id || !precioCompra) {
        return res.status(400).send("All fields are required.");
    }

    const query = "INSERT INTO producto (nombre, nombre_comercial, precio_venta, proveedor_id, precio_compra, fotoProducto) VALUES (?, ?, ?, ?, ?, ?)";
    
    connection.query(query, [nombre, nombre_comercial, precio_venta, proveedor_id, precio_compra, fotoProducto], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error, couldn't insert product");
        }
        res.json({ message: "Product created successfully", productId: result.insertId });
    });
}

function updateProducto(req, res) {
    const productoId = req.params.id;
    const { nombre, nombre_comercial, precio_venta, proveedor_id, precio_compra, fotoProducto } = req.body;

    const query = "UPDATE producto SET nombre=?, nombre_comercial=?, precio_venta=?, proveedor_id=?, precio_compra=?, fotoProducto=? WHERE id=?";
    
    connection.query(query, [nombre, nombre_comercial, precio_venta, proveedor_id, precio_compra, fotoProducto, productoId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error, couldn't update product");
        }
        res.json({ message: "Product updated successfully" });
    });
}

function getProductoById(req, res) {
    const productoId = req.params.id;
    const query = "SELECT * FROM producto WHERE id = ?";

    connection.query(query, [productoId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error retrieving product from database"); 
        }
        res.json(result);
    });
}

function deleteProducto(req, res) {
    const productoId = req.params.id;
    const query = "DELETE FROM producto WHERE id=?";

    connection.query(query, [productoId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error deleting product from database"); 
        }
        res.json({ message: "Product deleted successfully" });
    });
}

module.exports = {
    getAllProductos,
    createProducto,
    updateProducto,
    getProductoById,
    deleteProducto
};
