import React, { useState, useEffect } from "react";
import Formulario from "./Formulario";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from 'axios';
import "../estilos-pagina/mostrar.css";

import logoProducto from "./IMG COMPONENTES/producto.png";

const API_BASE_URL = "http://localhost:3001/api";

function ListaProducto() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/producto`);
        setProductList(response.data);
      } catch (error) {
        console.error("Error fetching productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handleFormSubmit = (formData) => {
    setProductList((prevList) => [...prevList, formData]);
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/producto/eliminar/${id}`); // Asegúrate de que la ruta sea correcta
      const updatedProductList = productList.filter((producto) => producto.id !== id);
      setProductList(updatedProductList);
    } catch (error) {
      console.error("Error deleting producto:", error);
    }
  };

  const actionTemplate = (rowData) => {
    return (
      <button onClick={() => eliminarProducto(rowData.id)} className="btn btn-danger">
        Eliminar
      </button>
    );
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logoProducto} alt="Logo Producto" className="producto-logo" />
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <Formulario onSubmit={handleFormSubmit} />
      </div>

      <hr />
      <div className="card mb-3 shadow-8 surface-card text-center border-round-sm h-100rem w-70rem font-semibold">
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <DataTable 
            value={productList} 
            tableStyle={{ minWidth: "50rem" }} 
            selectionMode="single"
          >
            <Column field="nombre" header="Nombre"></Column>
            <Column field="nombreComercial" header="Nombre comercial"></Column>
            <Column field="precioVenta" header="Precio de venta"></Column>
            <Column field="proveedor" header="Proveedor"></Column>
            <Column field="precioCompra" header="Precio de compra"></Column>
            <Column 
              field="fotoProducto" 
              header="Foto del producto" 
              body={(rowData) => <img src={rowData.fotoProducto} alt={rowData.nombre} width="50" />} 
            />
            <Column body={actionTemplate} header="Acciones" />
          </DataTable>
        )}
      </div>
    </div>
  );
}

export default ListaProducto;


















// import React, { useState, useEffect } from "react";
// import Formulario from "./Formulario";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import axios from 'axios';
// import "../estilos-pagina/mostrar.css";

// import logoProducto from "./IMG COMPONENTES/producto.png";



// const API_BASE_URL = "http://localhost:3001/api";

// function ListaProducto() {
//   const [productList, setProductList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProductos = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${API_BASE_URL}/producto`);
//         setProductList(response.data);
//       } catch (error) {
//         console.error("Error fetching productos:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductos();
//   }, []);

//   const handleFormSubmit = (formData) => {
//     setProductList((prevList) => [...prevList, formData]);
//   };

//   const eliminarProducto = async (id) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/producto/${id}`);
//       const updatedProductList = productList.filter((producto) => producto.id !== id);
//       setProductList(updatedProductList);
//     } catch (error) {
//       console.error("Error deleting producto:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="logo-container">
//         <img src={logoProducto} alt="Logo Producto" className="producto-logo" />
//       </div>

//       <div className="d-flex justify-content-center align-items-center">
//         <Formulario onSubmit={handleFormSubmit} />
//       </div>

//       <hr />
//       <div className="card mb-3 shadow-8 surface-card text-center border-round-sm h-100rem w-70rem font-semibold">
//         {loading ? (
//           <p>Cargando productos...</p>
//         ) : (
//           <DataTable 
//             value={productList} 
//             tableStyle={{ minWidth: "50rem" }} 
//             selectionMode="single" 
//             onSelectionChange={(e) => eliminarProducto(e.value.id)} // Cambiar a tu lógica de eliminación
//           >
//             <Column field="id" header="ID"></Column>
//             <Column field="nombre" header="Nombre"></Column>
//             <Column field="seleccion" header="Selección"></Column>
//             <Column field="nombreComercial" header="Nombre comercial"></Column>
//             <Column field="precioVenta" header="Precio de venta"></Column>
//             <Column field="proveedor" header="Proveedor"></Column>
//             <Column field="precioCompra" header="Precio de compra"></Column>
//             <Column 
//               field="fotoProducto" 
//               header="Foto del producto" 
//               body={(rowData) => <img src={rowData.fotoProducto} alt={rowData.nombre} width="50" />} 
//             />
//           </DataTable>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ListaProducto;





