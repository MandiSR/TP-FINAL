import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../estilos-pagina/mostrar.css";

import logoProducto from "./IMG COMPONENTES/pedido.png";

function Pedido() {
  const [pedidoList, setPedidoList] = useState([]);

  const [inputPedido, setInputPedido] = useState({
    // id: "",
    productoSelect: "",
    cliente: "",
    fechaDeCarga: "",
    fechaDeEntrega: "",
    saldoTotal: "",
  });

  const handleChangePedido = (event) => {
    const { name, value } = event.target;
    setInputPedido({
      ...inputPedido,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPedidoList([...pedidoList, inputPedido]);
    setInputPedido({ // Reinicia el formulario después de enviar
      // id: "",
      productoSelect: "",
      cliente: "",
      fechaDeCarga: "",
      fechaDeEntrega: "",
      saldoTotal: "",
    });
  };

  const eliminarPedido = (id) => {
    const borrarPedido = pedidoList.filter(
      (inputPedido) => inputPedido.id !== id
    );
    setPedidoList(borrarPedido);
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logoProducto} alt="Logo Producto" className="producto-logo" />
      </div>
      <div className="d-flex justify-content-center align-item-center">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* <div className="col-md-12">
              <input
                className="form-control"
                type="number"
                name="id"
                placeholder="ID del producto"
                value={inputPedido.id}
                onChange={handleChangePedido}
              />
            </div> */}
            <div>
              <input
                className="form-control"
                type="text"
                name="productoSelect"
                placeholder="Nombre del producto seleccionado"
                value={inputPedido.productoSelect}
                onChange={handleChangePedido}
              />
            </div>
            <div>
              <input
                className="form-control"
                type="text"
                name="cliente"
                placeholder="Nombre del cliente"
                value={inputPedido.cliente}
                onChange={handleChangePedido}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>
                <input
                  className="form-control"
                  type="date"
                  name="fechaDeCarga"
                  value={inputPedido.fechaDeCarga}
                  onChange={handleChangePedido}
                />{" "}
                Fecha de carga
              </label>
            </div>
            <div className="col-md-6">
              <label>
                <input
                  className="form-control"
                  type="date"
                  name="fechaDeEntrega"
                  value={inputPedido.fechaDeEntrega}
                  onChange={handleChangePedido}
                />{" "}
                Fecha de entrega
              </label>
            </div>
          </div>
          <div>
            <input
              className="form-control"
              type="number"
              name="saldoTotal"
              placeholder="Saldo del pedido"
              value={inputPedido.saldoTotal}
              onChange={handleChangePedido}
            />
          </div>
          <button className="boton-send" type="submit">Enviar</button>
        </form>
      </div>
      <hr />

      <div className="card mb-3 shadow-8 surface-card border-round-sm h-100rem w-70rem font-semibold">
        <DataTable value={pedidoList} tableStyle={{ minWidth: "50rem" }} selectionMode="single"
          onRowClick={(event) => {
            console.log(event.data);
            window.location.href = `/pedido/${event.data.id}`;
          }}>
          {/* <Column field="id" header="ID"></Column> */}
          <Column field="productoSelect" header="Producto seleccionado"></Column>
          <Column field="cliente" header="Nombre del cliente"></Column>
          <Column field="fechaDeEntrega" header="Fecha de entrega"></Column>
          <Column field="saldoTotal" header="Saldo total"></Column>
        </DataTable>
      </div>

      <div>
        {pedidoList.map((value, index) => (
          <div key={index} className="card mb-3 shadow-8 surface-card border-round-sm h-100rem w-70rem font-semibold">
            <div className="mg-4">
              {/* <p>El ID del pedido {value.id}</p> */}
              <p>El producto seleccionado {value.productoSelect}</p>
              <p>El nombre del cliente {value.cliente}</p>
              <p>La fecha de carga del pedido {value.fechaDeCarga}</p>
              <p>La fecha de entrega del pedido {value.fechaDeEntrega}</p>
              <p>El saldo total del pedido $ {value.saldoTotal}</p>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => eliminarPedido(value.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pedido;
