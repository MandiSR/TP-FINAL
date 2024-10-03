import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../estilos-pagina/mostrar.css";

import logoProducto from "./IMG COMPONENTES/proveedor.png";

const API_BASE_URL = "http://localhost:3001/api";

function FormProveedor() {
  const [proveedorList, setProveedorList] = useState([]);
  const [inputProveedor, setInputProveedor] = useState({
    nombre: "",
    cuit: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProveedores();
  }, []);

  // Para reiniciar el mensaje
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000); // 3 segundos
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchProveedores = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/proveedor`);
      setProveedorList(response.data);
    } catch (error) {
      console.error("Error fetching proveedores:", error);
    }
  };

  const handleChangeProveedor = (event) => {
    const { name, value } = event.target;
    setInputProveedor({
      ...inputProveedor,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Formulario enviado:", inputProveedor);

    try {
      const response = await axios.post(`${API_BASE_URL}/proveedor/guardar`, inputProveedor);
      console.log("Proveedor guardado:", response.data);
      setInputProveedor({ nombre: "", cuit: "" });
      fetchProveedores();
      setMessage("Proveedor guardado correctamente.");
    } catch (error) {
      console.error("Error creando proveedor:", error);
      setMessage("Error al guardar el proveedor.");
    }
  };

  const eliminarProveedor = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/proveedor/eliminar/${id}`);
      fetchProveedores();
    } catch (error) {
      console.error("Error eliminando proveedor:", error);
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logoProducto} alt="Logo Producto" className="producto-logo" />
      </div>

      <div className="d-flex justify-content-center align-item-center">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <input
                className="form-control"
                type="text"
                name="nombre"
                placeholder="Nombre del proveedor"
                value={inputProveedor.nombre}
                onChange={handleChangeProveedor}
                required
              />
            </div>
            <div className="col-md-12">
              <input
                className="form-control"
                type="text"
                name="cuit"
                placeholder="CUIT del proveedor"
                value={inputProveedor.cuit}
                onChange={handleChangeProveedor}
                required
              />
            </div>
          </div>
          <button className="boton-send" type="submit">Enviar</button>
        </form>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      <hr />

      <DataTable value={proveedorList}>
        <Column field="nombre" header="Nombre"></Column>
        <Column field="cuit" header="CUIT"></Column>
        <Column 
          body={(rowData) => (
            <button onClick={() => eliminarProveedor(rowData.id)}>Delete</button>
          )} 
          header="Acciones" 
        />
      </DataTable>
    </div>
  );
}

export default FormProveedor;
