import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import "../estilos-pagina/mostrar.css";

import logoProducto from "./IMG COMPONENTES/cliente.png";

const API_BASE_URL = "http://localhost:3001/api";

function FormCliente() {
  const [clienteList, setClienteList] = useState([]);
  const [inputCliente, setInputCliente] = useState({ id: "", nombre: "", cuit: "" });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cliente/usuarios`);
      setClienteList(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleChangeCliente = (event) => {
    const { name, value } = event.target;
    setInputCliente({ ...inputCliente, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/cliente/guardar`, {
        nombre: inputCliente.nombre,
        cuit: inputCliente.cuit,
      });
      console.log('Cliente creado:', response.data);
      setInputCliente({ id: "", nombre: "", cuit: "" });
      fetchClientes(); 
    } catch (error) {
      console.error("Error al crear cliente:", error);
    }
  };

  const eliminarCliente = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/cliente/eliminar/${id}`);
      fetchClientes(); 
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logoProducto} alt="Logo Producto" className="producto-logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          name="nombre"
          placeholder="Nombre del cliente"
          value={inputCliente.nombre}
          onChange={handleChangeCliente}
          required
        />
        <input
          className="form-control"
          type="text"
          name="cuit"
          placeholder="CUIT del cliente"
          value={inputCliente.cuit}
          onChange={handleChangeCliente}
          required
        />
        <button className="boton-send" type="submit">Enviar</button>
      </form>
      <hr />
      <DataTable value={clienteList} tableStyle={{ minWidth: "50rem" }}>
        <Column field="id" header="ID"></Column>
        <Column field="nombre" header="Nombre del cliente"></Column>
        <Column field="cuit" header="CUIT"></Column>
        <Column 
          body={(rowData) => (
            <button onClick={() => eliminarCliente(rowData.id)}>Delete</button>
          )} 
          header="Acciones" 
        />
      </DataTable>
    </div>
  );
}

export default FormCliente;


