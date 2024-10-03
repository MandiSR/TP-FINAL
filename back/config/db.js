const { Sequelize } = require('sequelize');

const dbConnection = new Sequelize('tp-final-uade', 'root', 'amanda', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    dbConnection
}