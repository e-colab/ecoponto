const Sequelize = require('sequelize')

const sequelize = require('../database/dbConfig')

const Categoria = sequelize.define('categoria', {
    idCategoria: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nomeCategoria: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    tableName: 'Categoria'
})

module.exports = Categoria