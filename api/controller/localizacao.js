const {Client} = require("@googlemaps/google-maps-services-js")
require('dotenv').config()

const client = new Client({})

exports.alterarLocalizacao = (req, res, next) => {
    const endereco = req.body.endereco
    const numeroEndereco = req.body.numeroEndereco
    const cidade = req.body.cidade
    const estado = req.body.estado

    var obj = {}
    obj.coords = {}

    client.geocode({
        params: {
            key: process.env.API_KEY_GOOGLE,
            address: `${endereco},${numeroEndereco},${cidade},${estado}`
        }
    })
    .then(geo => {
        obj.coords.latitude = geo.data.results[0].geometry.location.lat
        obj.coords.longitude = geo.data.results[0].geometry.location.lng

        res.send(obj)
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
}