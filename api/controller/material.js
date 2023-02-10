// const Material = require('../models/material')
// const EmpresaMaterial = require('../models/empresamaterial')
// const Empresa = require('../models/empresa')
// const Categoria = require('../models/categoria')
const pool = require('../database/dbConfig')


exports.getMaterial = (req, res, next) => {

    pool.query('SELECT M.nome, M.qualidade, M.unidade, EM.data, C.descricao, E.cnpj, E.nome, E.email, E.telefone, E.funcResponsavel, E.cep, E.cidade, E.estado, E.endereco, E.bairro, E.numeroEndereco, E.lat, E.long, EM.objetivo, EM.quantidade, EM.medidaCadastrada FROM ecoponto.material M JOIN ecoponto.empresamaterial EM ON M.idprod = EM.idprod JOIN ecoponto.empresa E ON E.cnpj = EM.cnpj JOIN ecoponto.categoria C ON C.idCategoria = M.categoria')
    .then(material => {
        console.log(material.rows)
        res.send(material.rows)
    })
    .catch(err => {
        console.error(err.stack)
    })
}

exports.postMaterial = async (req, res, next) => {
    
    // Material
    const qualidade = req.body.qualidade
    const nome = req.body.nome
    const unidade = req.body.unidade
    const categoria = req.body.categoria
    // EmpresaMaterial
    const cnpj = req.body.cnpj
    const objetivo = req.body.objetivo
    const quantidade = req.body.quantidade
    const medidaCadastrada = req.body.medidaCadastrada

    const query = 'SELECT * FROM ecoponto.material M, ecoponto.empresa E WHERE E.cnpj = $1 AND M.qualidade = $2 AND M.nome = $3'
    const queryMaterial = 'INSERT INTO ecoponto.material(qualidade, nome, unidade, categoria) VALUES ($1, $2, $3, $4) RETURNING idProd'
    const queryEmpresaMaterial = 'INSERT INTO ecoponto.empresamaterial(cnpj, idProd, qualidade, objetivo, quantidade, medidaCadastrada, categoria) VALUES ($1, $2, $3, $4, $5, $6, $7)'

    const values = [cnpj, qualidade, nome]
    const valuesMaterial = [qualidade, nome, unidade, categoria]

    const client = await pool.connect()

    try {
        await client.query('BEGIN')
        const queryRes = await client.query(query, values)

        if(queryRes.rows.length === 0) {
            const queryMat = await client.query(queryMaterial, valuesMaterial)
            // console.log(queryMat.rows)

            const valuesEmpresaMaterial = [cnpj, queryMat.rows[0].idprod, qualidade, objetivo, quantidade, medidaCadastrada, categoria]
            await client.query(queryEmpresaMaterial, valuesEmpresaMaterial)


        } else {
            const valuesEmpresaMaterial = [cnpj, queryRes.rows[0].idprod, qualidade, objetivo, quantidade, medidaCadastrada, categoria]
            await client.query(queryEmpresaMaterial, valuesEmpresaMaterial)
        }

        console.log('Material Cadastrado')
        await client.query('COMMIT')
        res.sendStatus(200)
    } catch (e) {
        await client.query('ROLLBACK')
        console.log(e.stack)
        res.sendStatus(400)
        throw e
    } finally {
        client.release()
    }

   
}