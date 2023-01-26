const Sequelize = require('sequelize')

const sequelize = require('../database/dbConfig')

const EmpresaMaterial = sequelize.define('empresamaterial', {
    cnpj: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Empresa',
            key: 'cnpj'
        }
    },
    idProd: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Material',
            key: 'idProd'
        }
    },
    qualidade: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Material',
            key: 'qualidade'
        }
    },
    data: {
        type: Sequelize.DATEONLY,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
    },
    tipoAcao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    medidaCadastrada: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'EmpresaMaterial',
    indexes: [{ unique: true, fields: ["qualidade", "idProd"] }]
})

module.exports = EmpresaMaterial