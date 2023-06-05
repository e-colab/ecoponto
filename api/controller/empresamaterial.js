const pool = require('../database/dbConfig')

pool.connect()

exports.findEmpresaMaterial = (req, res) => {
    var cnpj = req.body.cnpj

    pool.query(`SELECT m.nome ,em.qualidade ,TO_DATE(em.data, 'DD-MM-YYYY') as data_de_cadastro ,em.objetivo ,c.descricao FROM ecoponto.empresamaterial em , ecoponto.material m , ecoponto.categoria c WHERE em.cnpj = '${cnpj}' AND m.idprod = em.idprod AND c.idcategoria = em.categoria;`)
    .then(emp_mat => {
        if(emp_mat.rows.len != 0) {
            res.send(emp_mat.rows)
        } else {
            res.send({})
        }
    })
    .catch(err => {
        console.error(err.stack)
    })
}