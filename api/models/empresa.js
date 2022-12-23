const Sequelize = require('sequelize')

const sequelize = require('../database/dbConfig')

const Empresa = sequelize.define('empresa', {
    cnpj: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    funcResponsavel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numeroEndereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lat: {
        type: Sequelize.STRING,
        allowNull: false
    },
    long: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'Empresa'
})

module.exports = Empresa