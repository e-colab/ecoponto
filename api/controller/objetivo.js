const pool = require('../database/dbConfig')

pool.connect()

exports.getObjetivos = (req, res, next) => {
    pool.query('SELECT descricao as value FROM ecoponto.objetivo')
    .then(objetivo => {
        res.send(objetivo.rows)
    })
    .catch(err => {
        console.error(err.stack)
    })
}

exports.postObjetivo = (req, res, next) => {
    const query = 'INSERT INTO ecoponto.objetivo(descricao) VALUES($1)'
    const values = [req.body.descricao]

    pool.query(query, values)
    .then(result => {
        res.status(200).json({message: 'Objetivo cadastrado com sucesso!'})
    })
    .catch(err => {
        res.status(400).json({error: 'Objetivo já existente.'})
    })
    
}