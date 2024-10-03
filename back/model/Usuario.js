const { dbConnection } = require('../config/db');
const { DataTypes } = require('sequelize');

const Usuario = dbConnection.define("Usuario", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        required: true,
    },
    email: {
        type: DataTypes.STRING,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        required: true
    }
})

Usuario.sync({alter: true}).then(() => {
    console.log('Tabla Usuario sincronizada')
})

module.exports = Usuario