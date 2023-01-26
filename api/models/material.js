const Sequelize = require('sequelize')

const sequelize = require('../database/dbConfig')

const Material = sequelize.define('material', {
    idProd: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    qualidade: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        onDelete: 'cascade'
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    unidade: {
        type: Sequelize.STRING,
        allowNull: true
    },
    categoria: {
        type: Sequelize.INTEGER,
        allowNull: true,
        reference: {
            model: 'Categoria',
            key: 'idCategoria'
        }
    }
},{
    tableName: 'Material',
    // indexes: [{ unique: true, fields: ["qualidade"] }]
})

module.exports = Material