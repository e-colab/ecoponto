const pool = require('../database/dbConfig')

pool.connect()

exports.getCategorias = (req, res, next) => {
    pool.query('SELECT * FROM ecoponto.categoria')
    .then(categoria => {
        res.send(categoria.rows)
    })
    .catch(err => {
        console.error(err.stack)
    })
}

exports.postCategoria = (req, res, next) => {
    const query = 'INSERT INTO ecoponto.categoria(nomeCategoria, descricao) VALUES($1, $2)'
    const values = [req.body.nomeCategoria, req.body.descricao]

    pool.query(query, values)
    .then(result => {
        console.log('Categoria cadastrada')
        res.sendStatus(200)
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
    
}