import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "../estilos-pagina/mostrar.css";
import axios from 'axios';

import logoProducto from "./IMG COMPONENTES/catalogo.png";

const API_BASE_URL = "http://localhost:3001/api";

function CatalogoProducto() {
  const [catalogoList, setCatalogoList] = useState([]);

  // Función para obtener productos
  const fetchProductos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/el-producto`);
      setCatalogoList(response.data);
    } catch (error) {
      console.error('Error fetching productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/eliminar/${id}`);
      fetchProductos(); // Volver a obtener la lista después de eliminar
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logoProducto} alt="Logo Producto" className="logo-container" />
      </div>

      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          {catalogoList.map((item) => (
            <div key={item.id} className="col-4">
              <Card
                title={item.nombre}
                subTitle={`US$${item.precioVenta}`}
                footer={
                  <Button
                    label="Eliminar"
                    severity="danger"
                    icon="pi pi-times"
                    onClick={() => eliminarProducto(item.id)} // Asegúrate de que "id" esté presente
                  />
                }
                header={<img src={item.fotoProducto} alt={item.nombre} style={{ width: "100%", height: "200px", objectFit: "cover" }} />}
                className="w-100 mt-4 shadow-8 surface-card text-center border-round-sm"
              />
            </div>
          ))}
        </div>

        <div className="card shadow-8 surface-card text-center border-round-sm h-100rem w-70rem font-semibold">
          <DataTable
            value={catalogoList}
            tableStyle={{ minWidth: "50rem" }}
            selectionMode="single"
            onRowClick={(event) => {
              console.log(event.data);
              window.location.href = `/catalogoproducto/${event.data.id}`; // Cambiado a 'id' para consistencia
            }}
          >
            <Column field="nombre" header="Nombre comercial" />
            <Column field="precioVenta" header="Precio de venta" />
            <Column field="fotoProducto" header="Foto del producto" body={(rowData) => <img src={rowData.fotoProducto} alt={rowData.nombre} style={{ width: "50px", height: "50px", objectFit: "cover" }} />} />
          </DataTable>
        </div>
      </div>

      <br />
    </div>
  );
}

export default CatalogoProducto;




















// import React, { useState, useEffect } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Card } from "primereact/card";
// import { Button } from "primereact/button";
// import "../estilos-pagina/mostrar.css";
// import axios from 'axios';

// import logoProducto from "./IMG COMPONENTES/catalogo.png";


// const API_BASE_URL = "http://localhost:3001/api";

// function CatalogoProducto() {
//   const [catalogoList, setCatalogoList] = useState([]);

//   // Función para obtener productos
//   const fetchProductos = async () => {
//     try {
//         const response = await axios.get('http://localhost:3001/api/producto');
//         setCatalogoList(response.data);
//     } catch (error) {
//         console.error('Error fetching productos:', error);
//     }
//   };

//   useEffect(() => {
//       fetchProductos();
//   }, []);

//   const eliminarProducto = (id) => {
     
//   };

//   return (
//     <div className="container">
//       <div className="logo-container">
//         <img src={logoProducto} alt="Logo Producto" className="logo-container-" />
//       </div>


//       <div className="container">
//         <div className="row d-flex justify-content-center align-items-center">
//           {catalogoList.map((item, index) => (
//             <div key={index} className="col-4">
//               <Card
//                 title={item.nombre}
//                 subTitle={`US$${item.precioVenta}`}
//                 footer={
//                   <>
//                     <Button
//                       label="Eliminar"
//                       severity="danger"
//                       icon="pi pi-times"
//                       onClick={() => eliminarProducto(item.nombre)}
//                     />
//                   </>
//                 }
//                 header={<img src={item.fotoProducto} alt={item.nombre} style={{ width: "100%", height: "200px", objectFit: "cover" }} />}
//                 className="w-100 mt-4 shadow-8 surface-card text-center border-round-sm"
//               />
//             </div>
//           ))}
//         </div>

//         <div className="card shadow-8 surface-card text-center border-round-sm h-100rem w-70rem font-semibold">
//           <DataTable
//             value={catalogoList}
//             tableStyle={{ minWidth: "50rem" }}
//             selectionMode="single"
//             onRowClick={(event) => {
//               console.log(event.data);
//               window.location.href = `/catalogoproducto/${event.data.name}`;
//             }}
//           >
//             <Column field={`name`} header="Nombre comercial"></Column>
//             <Column field={`precio`} header="Precio de venta"></Column>
//             <Column field={`img`} header="Foto del producto"></Column>
//           </DataTable>
//         </div>
//       </div>

//       <br></br>
//     </div>
//   );
// }

// export default CatalogoProducto;