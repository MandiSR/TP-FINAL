const connection = require("../connectDB/dBconnection");

function getAllProveedores(req, res) {
    const query = "SELECT * FROM proveedor";

    connection.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error retrieving proveedores from database");
        }
        res.json(result);
    });
}

function createProveedor(req, res) {
    const { nombre, cuit } = req.body;
    const query = "INSERT INTO proveedor (nombre, cuit) VALUES (?, ?)";

    connection.query(query, [nombre, cuit], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error, couldn't insert proveedor");
        }
        res.status(201).json({ message: "Proveedor creado con éxito", proveedorId: result.insertId });
    });
}

function updateProveedor(req, res) {
    const proveedorId = req.params.id;
    const { nombre, cuit } = req.body;
    const query = "UPDATE proveedor SET nombre=?, cuit=? WHERE id=?";

    connection.query(query, [nombre, cuit, proveedorId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error, couldn't update proveedor");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Proveedor no encontrado");
        }
        res.json({ message: "Proveedor actualizado con éxito" });
    });
}

function getProveedorById(req, res) {
    const proveedorId = req.params.id;
    const query = "SELECT * FROM proveedor WHERE id = ?";

    connection.query(query, [proveedorId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error retrieving proveedor from database");
        }
        if (result.length === 0) {
            return res.status(404).send("Proveedor no encontrado");
        }
        res.json(result[0]);
    });
}

function deleteProveedor(req, res) {
    const proveedorId = req.params.id;
    const query = "DELETE FROM proveedor WHERE id=?";

    connection.query(query, [proveedorId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error deleting proveedor from database");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Proveedor no encontrado");
        }
        res.json({ message: "Proveedor eliminado con éxito" });
    });
}

module.exports = {
    getAllProveedores,
    createProveedor,
    updateProveedor,
    getProveedorById,
    deleteProveedor
};
