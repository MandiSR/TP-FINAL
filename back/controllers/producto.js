const connection = require("../connectDB/dBconnection");

function getAllProductos(req, res) {
    const query = "SELECT * FROM producto";

    connection.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error retrieving products from database");
        } else {
            console.error(err);
            return res.status(500).send("Error retrieving products from database");
        }
    });
}

// function createProducto(req, res) {
//     const { nombre, nombreComercial, seleccion, precioVenta, proveedor, precioCompra } = req.body;
//     const fotoProducto = req.file ? `../uploads/${req.file.filename}` : null; 
//     const query = "INSERT INTO producto (nombre, nombreComercial, seleccion, precioVenta, proveedor, precioCompra, fotoProducto) VALUES (?, ?, ?, ?, ?, ?, ?)";

//     connection.query(query, [nombre, nombreComercial, seleccion, precioVenta, proveedor, precioCompra, fotoProducto], (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send("Error, couldn't insert products");
//         } else {
//             res.json({ message: "Product created successfully", productId: result.insertId });
//         }
//     });
// }

const fs = require('fs');
const path = require('path');
const connection = require("../connectDB/dBconnection");

function createProducto(req, res) {
    const { nombre, nombreComercial, proveedor, precioVenta, precioCompra, fotoProducto } = req.body;

    if (!fotoProducto) {
        return res.status(400).send("No image provided");
    }

    // Si la imagen está en base64, debes quitar la cabecera
    const base64Data = fotoProducto.replace(/^data:image\/\w+;base64,/, "");
    const filePath = path.join(__dirname, '../uploads', `${Date.now()}_product.jpg`);

    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error, couldn't save the image");
        }

        const query = "INSERT INTO producto (nombre, nombreComercial, proveedor, precioVenta, precioCompra, fotoProducto) VALUES (?, ?, ?, ?, ?, ?)";
        
        connection.query(query, [nombre, nombreComercial, proveedor, precioVenta, precioCompra, filePath], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error, couldn't insert product");
            } else {
                res.json({ message: "Product created successfully", productId: result.insertId });
            }
        });
    });
}



function updateProducto(req, res) {
    const productoId = req.params.id;
    const { nombre, nombreComercial, seleccion, precioVenta, proveedor, precioCompra, fotoProducto } = req.body;
    const query = "UPDATE producto SET nombre=?, nombreComercial=?, seleccion=?, precioVenta=?, proveedor=?, precioCompra=?, fotoProducto=? WHERE id=?";

    connection.query(query, [nombre, nombreComercial, seleccion, precioVenta, proveedor, precioCompra, fotoProducto, productoId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error, couldn't update products");
        } else {
            res.json({ message: "Product updated successfully" });
        }
    });
}

function getProductoById(req, res) {
    const productoId = req.params.id;
    const query = "SELECT * FROM producto WHERE id = ?";

    connection.query(query, [productoId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error retrieving product from database"); 
        } else {
            res.json(result);
        }
    });
}

function deleteProducto(req, res) {
    const productoId = req.params.id;
    const query = "DELETE FROM producto WHERE id=?";

    connection.query(query, [productoId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error deleting products from database"); 
        } else {
            res.json({ message: "Product deleted successfully" });
        }
    });
}

module.exports = {
    getAllProductos,
    createProducto,
    updateProducto,
    getProductoById,
    deleteProducto
};
