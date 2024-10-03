const express = require('express');
const app = express();
const cors = require('cors');

//const bodyParser = require('body-parser');

require('dotenv').config()

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: 'Content-Type,Authorization' 
}));

//LLAMAR A LA RUTAS
const proveedorroutes = require('./routes/proveedorRoute');
const clienteroutes = require('./routes/clienteRoute');
const productoroutes = require('./routes/productoRoute');
const pedidoroutes = require('./routes/pedidoRoute');


//Rutas
app.use('/api/proveedor',proveedorroutes)
app.use('/api/cliente',clienteroutes)
app.use('/api/producto',productoroutes)
app.use('/api/pedido',pedidoroutes)



// // Middleware para procesar JSON y datos de formularios
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

// // Middleware para servir archivos estáticos (imágenes en este caso)
//app.use(express.static('uploads')); // Permite acceder a las imágenes en la carpeta uploads



//Firebase
var admin = require("firebase-admin");

var serviceAccount = require("./tp-final-uade-firebase-adminsdk-b578q-82d326609f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



app.listen(3001, () => {
    console.log('Server is running');
});