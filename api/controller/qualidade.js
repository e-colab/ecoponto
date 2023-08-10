const pool = require('../database/dbConfig')

pool.connect()

exports.getQualidades = (req, res, next) => {
    pool.query('SELECT descricao as value FROM ecoponto.qualidade')
    .then(qualidade => {
        res.send(qualidade.rows)
    })
    .catch(err => {
        console.error(err.stack)
    })
}

exports.postQualidade = (req, res, next) => {
    const query = 'INSERT INTO ecoponto.qualidade(descricao) VALUES($1)'
    const values = [req.body.descricao]

    pool.query(query, values)
    .then(result => {
        res.status(200).json({message: 'Qualidade cadastrada com sucesso!'})
    })
    .catch(err => {
        res.status(400).json({error: 'Qualidade já existente.'})
    })
    
}