const NodeGeocoder = require('node-geocoder')
require('dotenv').config()

const Empresa = require('../models/empresa')

const opt = {
    provider: 'google',
    apiKey: process.env.API_KEY_GOOGLE,
    language: 'pt-BR',
    region: '.br'
}

const geocoder = NodeGeocoder(opt)

exports.getAddEmpresa = (req, res, next) => {
    Empresa.findAll()
    .then(empresas => {
            console.log(empresas)
            res.send(empresas)
        })
        .catch(err => {
            console.log(err)
        })
    
    // console.log("arrayData linha 47 = " + arrayData)
    // return arrayData
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

    // const latlong = getLatLong(endereco, numeroEndereco, cidade, estado, cep)
    // console.log('Vetor: ' + latlong)
    // latlong.then(x => console.log('Vetor' + x))


    const latlong = []

    geocoder.geocode({
        address: `${endereco},${numeroEndereco},${cidade},${estado}`, 
        country: 'Brasil',
        zipcode: cep
    })
    .then(geo => {
        geo.map(elem => {
            latlong.push(elem.latitude)
            latlong.push(elem.longitude)
            // console.log('Arr: ' + latlong)
            // return latlong
            Empresa.create({
                cnpj: cnpj,
                nome: nome,
                email: email,
                telefone: telefone,
                funcResponsavel: funcResponsavel,
                cep: cep,
                cidade: cidade,
                estado: estado,
                endereco: endereco,
                bairro: bairro,
                numeroEndereco: numeroEndereco,
                lat: latlong[0],
                long: latlong[1]
            })
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
