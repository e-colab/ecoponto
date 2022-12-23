const Categoria = require('../models/categoria')

exports.getCategorias = (req, res, next) => {
    Categoria.findAll()
    .then(row => {
        res.json(row)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.postCategoria = (req, res, next) => {
    let array = req.body

    Categoria.bulkCreate(array)
    .then(result => {
        console.log('Categoria cadastrada')
        res.sendStatus(200)
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
    
}