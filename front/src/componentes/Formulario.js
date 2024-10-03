import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:3001/api";

function Formulario({ onSubmit }) {
    const [inputProduct, setInputProduct] = useState({
        nombre: '',
        nombreComercial: '',
        precioVenta: '',
        proveedor: '',
        precioCompra: '',
        fotoProducto: null
    });
    
    const [productos, setProductos] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/proveedor/proveedor`);
                setProveedores(response.data);
                console.log(response.data); // Verifica los datos aquí
            } catch (error) {
                console.error('Error fetching proveedores:', error);
                setErrorMessage('Error al cargar proveedores.');
            }
        };

        const fetchProductos = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/producto/el-producto`);
                setProductos(response.data);
            } catch (error) {
                console.error('Error fetching productos:', error);
                setErrorMessage('Error al cargar productos.');
            }
        };

        fetchProveedores();
        fetchProductos();
    }, []);

    const handleChangeProduct = (e) => {
        const { name, value, files } = e.target;
        if (name === 'fotoProducto' && files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setInputProduct(prevState => ({
                    ...prevState,
                    [name]: reader.result // Almacena la imagen como base64
                }));
            };
            reader.readAsDataURL(files[0]); // Convierte el archivo a base64
        } else {
            setInputProduct(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isNaN(inputProduct.precioVenta) || isNaN(inputProduct.precioCompra)) {
            setErrorMessage('Los precios deben ser números.');
            return;
        }

        const formData = new FormData();
        Object.entries(inputProduct).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await axios.post(`${API_BASE_URL}/producto/guardar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Limpiar el formulario y manejar la respuesta
            setInputProduct({
                nombre: '',
                nombreComercial: '',
                precioVenta: '',
                proveedor: '',
                precioCompra: '',
                fotoProducto: null
            });
            onSubmit(response.data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error uploading product:', error);
            setErrorMessage('Error al cargar el producto. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="nombre"
                                placeholder="Nombre del producto"
                                value={inputProduct.nombre}
                                onChange={handleChangeProduct}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="nombreComercial"
                                placeholder="Nombre comercial del producto"
                                value={inputProduct.nombreComercial}
                                onChange={handleChangeProduct}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Proveedor:</label>
                            <select
                                className="form-control"
                                name="proveedor"
                                value={inputProduct.proveedor}
                                onChange={handleChangeProduct}
                                required
                            >
                                <option value="">Selecciona un proveedor</option>
                                {proveedores.map((proveedor) => (
                                    <option key={proveedor.id} value={proveedor.id}>
                                        {proveedor.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="precioVenta"
                                placeholder="Precio de venta"
                                value={inputProduct.precioVenta}
                                onChange={handleChangeProduct}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="precioCompra"
                                placeholder="Precio de compra"
                                value={inputProduct.precioCompra}
                                onChange={handleChangeProduct}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="file"
                                className="elegir-archivo"
                                name="fotoProducto"
                                onChange={handleChangeProduct}
                                required
                            />
                        </div>
                    </div>
                </div>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <div className="text-center">
                    <button type="submit" className="boton-send">
                        Enviar
                    </button>
                </div>
            </form>
 
            <h2>Lista de Productos</h2>
            {/* <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>
                        {producto.nombre} <img src={`/${producto.imagen}`} alt={producto.nombre} style={{ width: '100px' }} />
                    </li>
                ))}
            </ul> */}
        </div>
    );
}

export default Formulario;