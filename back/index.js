const express = require('express');
const app = express();
const cors = require('cors');

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


// const PORT = process.env.PORT || 3000;

app.use('/usuario', require('./routes/usuarioRoute'))
app.use('/auth', require('./routes/authRoute'))
app.use('/api/proveedor',proveedorroutes)
app.use('/api/cliente',clienteroutes)
app.use('/api/producto',productoroutes)
app.use('/api/pedido',pedidoroutes)



//Firebase
var admin = require("firebase-admin");

var serviceAccount = require("./tp-final-uade-firebase-adminsdk-b578q-82d326609f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



app.listen(3001, () => {
    console.log('Server is running');
});