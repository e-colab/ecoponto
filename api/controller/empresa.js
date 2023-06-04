const NodeGeocoder = require('node-geocoder')
require('dotenv').config()

const pool = require('../database/dbConfig')

pool.connect()

const opt = {
    provider: 'google',
    apiKey: process.env.API_KEY_GOOGLE,
    language: 'pt-BR',
    region: '.br'
}

const geocoder = NodeGeocoder(opt)

exports.getEmpresa = (req, res, next) => {
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
    geocoder.geocode({
        address: `${endereco},${numeroEndereco},${cidade},${estado}`,
        country: 'Brasil',
        zipcode: cep
    })
    .then(geo => {
        console.log(geo)
        geo.map(elem => {
            latlong.push(elem.latitude)
            latlong.push(elem.longitude)

            const values = [cnpj, nome, email, telefone, funcResponsavel, cep, cidade, estado, endereco, bairro, numeroEndereco, latlong[0], latlong[1]]

            pool.query(query, values)
            .then(result => {
                console.log('Empresa cadastrada')
                res.sendStatus(200)
            })
            .catch(err => {
                console.log(err)
                res.sendStatus(400)
            })
    
        })
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
    
}
