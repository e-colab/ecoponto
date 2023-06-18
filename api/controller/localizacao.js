const {Client} = require("@googlemaps/google-maps-services-js")
require('dotenv').config()

const client = new Client({})

exports.alterarLocalizacao = (req, res, next) => {
    const endereco = req.body.endereco
    const numeroEndereco = req.body.numeroEndereco
    const cidade = req.body.cidade
    const estado = req.body.estado

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

        res.send(latlong)
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
}