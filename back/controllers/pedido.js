const connection = require("../connectDB/dBconnection");

function getAllPedidos(req, res) {
    const query = "SELECT * FROM pedido";

    connection.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error retrieving pedidos from database");
        }
        res.json(result);
    });
}

function createPedido(req, res) {
    const { nombreProducto, nombreCliente, saldoTotal } = req.body;
    const query = "INSERT INTO pedido (nombreProducto, nombreCliente, saldoTotal) VALUES (?, ?, ?)";

    connection.query(query, [nombreProducto, nombreCliente, saldoTotal], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error, couldn't insert pedido");
        }
        res.status(201).json({ message: "Pedido creado con éxito", pedidoId: result.insertId });
    });
}

function updatePedido(req, res) {
    const pedidoId = req.params.id;
    const { nombreProducto, nombreCliente, saldoTotal } = req.body;
    const query = "UPDATE pedido SET nombreProducto=?, nombreCliente=?, saldoTotal=? WHERE id=?";

    connection.query(query, [nombreProducto, nombreCliente, saldoTotal, pedidoId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error, couldn't update pedido");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Pedido no encontrado");
        }
        res.json({ message: "Pedido actualizado con éxito" });
    });
}

function getPedidoById(req, res) {
    const pedidoId = req.params.id;
    const query = "SELECT * FROM pedido WHERE id = ?";

    connection.query(query, [pedidoId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error retrieving pedido from database");
        }
        if (result.length === 0) {
            return res.status(404).send("Pedido no encontrado");
        }
        res.json(result[0]);
    });
}

function deletePedido(req, res) {
    const pedidoId = req.params.id;
    const query = "DELETE FROM pedido WHERE id=?";

    connection.query(query, [pedidoId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error deleting pedido from database");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Pedido no encontrado");
        }
        res.json({ message: "Pedido eliminado con éxito" });
    });
}

module.exports = {
    getAllPedidos,
    createPedido,
    updatePedido,
    getPedidoById,
    deletePedido
};
