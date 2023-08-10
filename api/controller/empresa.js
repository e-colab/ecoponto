const {Client} = require("@googlemaps/google-maps-services-js")
require('dotenv').config()

const pool = require('../database/dbConfig')
const client = new Client({})


pool.connect()

exports.findEmpresa = (req, res, next) => {
    var cnpj = req.body.cnpj
    
    pool.query(`SELECT nome, cnpj FROM ecoponto.empresa WHERE cnpj = '${cnpj}'`)
    .then(empresas => {
        if(empresas.rows.len != 0) {
            res.send(empresas.rows)
        } else {
            res.send({})
        }
    })
    .catch(err => {
        console.error(err.stack)
    })

}

exports.postAddEmpresa = (req, res, next) => {
    const cnpj = req.body.cnpj
    const nome = req.body.nome
    const email = req.body.email
    const telefone = req.body.telefone
    const funcResponsavel = req.body.funcResponsavel
    const cep = req.body.cep
    const cidade = req.body.cidade
    const estado = req.body.estado
    const endereco = req.body.endereco
    const bairro = req.body.bairro
    const numeroEndereco = req.body.numeroEndereco

    const query = 'INSERT INTO ecoponto.empresa VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)'

    const latlong = []
    client.geocode({
        params: {
            key: process.env.API_KEY_GOOGLE,
            address: `${endereco},${numeroEndereco},${cidade},${estado}`
        }
    })
    .then(geo => {
        latlong.push(geo.data.results[0].geometry.location.lat)
        latlong.push(geo.data.results[0].geometry.location.lng)

        const values = [cnpj, nome, email, telefone, funcResponsavel, cep, cidade, estado, endereco, bairro, numeroEndereco, latlong[0], latlong[1]]

        pool.query(query, values)
        .then(result => {
            res.status(200).json({message: 'Empresa cadastrada com sucesso!'})
        })
        .catch(err => {
            res.status(400).json({error: 'Empresa já existente.'})
        })
    })
    .catch(err => {
        res.status(500).json({error: 'Erro inesperado na requisição.'})
    })
    
}
