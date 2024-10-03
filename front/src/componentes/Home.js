import React from 'react';
import logoProducto from "./IMG COMPONENTES/home.png";


function Home() {
    return (
        <div className="container">
           <div className="logo-container">
            <img src={logoProducto} alt="Logo Producto" className="logo-container-" />
           </div>
        </div>
    );
}

export default Home;