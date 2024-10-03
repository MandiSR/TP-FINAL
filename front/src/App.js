import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Auth } from "./componentes/Auth";
import Navbar from "./componentes/Navbar";
import ListaProducto from "./componentes/ListaProducto";
import FormProveedor from "./componentes/FormProveedor";
import FormCliente from "./componentes/FormCliente";
import CatalogoProducto from "./componentes/CatalogoProducto";
import Pedido from "./componentes/Pedido";
import Reportes from "./componentes/Reportes";
import Home from "./componentes/Home";
import { useEffect } from "react";


//logo
import logoClick from "./IMG/click.png"; 


function App() { 

  return (

    <div className='background-app'>
      <div className='container'>
        <div className="logo-container">
          <img src={logoClick} alt="Logo" className="app-logo" />
        </div>  
      <BrowserRouter>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/login" element={<Auth />} />
            <Route path="/listaproducto" element={<ProtectedRoute><ListaProducto /></ProtectedRoute>} />
            <Route path="/formproveedor" element={<ProtectedRoute><FormProveedor /></ProtectedRoute>} />
            <Route path="/formcliente" element={<ProtectedRoute><FormCliente /></ProtectedRoute>} />
            <Route path="/catalogoproducto" element={<ProtectedRoute><CatalogoProducto /></ProtectedRoute>} />
            <Route path="/pedido" element={<ProtectedRoute><Pedido /></ProtectedRoute>} />
            <Route path="/reportes" element={<ProtectedRoute><Reportes /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      </div>
       <div className="container-fluid pie-index">
     <footer className="footer">
     <h5>Trabajo Práctico Final: <b>Grupo 2</b>.-</h5>
     <p><i>Integrantes:</i> Artilles, Lautaro;  Cabral, Rodrigo;  Lamarre, Patrice;  Ronchi, Agustín;  Sánchez Rizzotti, Amanda;  Volante, Franco.</p>
     </footer>
    </div>
    </div>
  );
}

const ProtectedRoute = ({redirectPath = "/login", children}) => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("firebaseToken")

    if (!token) {
      navigate(redirectPath)
    }
  }, [])

  return children
}

export default App;
