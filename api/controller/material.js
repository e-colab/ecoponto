// const Material = require('../models/material')
// const EmpresaMaterial = require('../models/empresamaterial')
// const Empresa = require('../models/empresa')
// const Categoria = require('../models/categoria')
const pool = require('../database/dbConfig')


exports.getMaterial = (req, res, next) => {

    pool.query('SELECT M.nome, M.qualidade, M.unidade, EM.data, C.nomeCategoria, E.cnpj, E.nome, E.email, E.telefone, E.funcResponsavel, E.cep, E.cidade, E.estado, E.endereco, E.bairro, E.numeroEndereco, E.lat, E.long, EM.objetivo, EM.quantidade, EM.medidaCadastrada FROM ecoponto.material M JOIN ecoponto.empresamaterial EM ON M.idprod = EM.idprod JOIN ecoponto.empresa E ON E.cnpj = EM.cnpj JOIN ecoponto.categoria C ON C.idCategoria = M.categoria')
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
        // const queryRes = await client.query(queryMaterial, valuesMaterial)
        const queryRes = await client.query(query, values)
            // console.log(queryRes.rows.length)

        if(queryRes.rows.length === 0) {
            const queryMat = await client.query(queryMaterial, valuesMaterial)
            // console.log(queryMat.rows)

            const valuesEmpresaMaterial = [cnpj, queryMat.rows[0].idprod, qualidade, objetivo, quantidade, medidaCadastrada, categoria]
            await client.query(queryEmpresaMaterial, valuesEmpresaMaterial)


        } else {
            const valuesEmpresaMaterial = [cnpj, queryRes.rows[0].idprod, qualidade, objetivo, quantidade, medidaCadastrada, categoria]
            await client.query(queryEmpresaMaterial, valuesEmpresaMaterial)
        }
        // const valuesEmpresaMaterial = [cnpj, queryMat.rows[0].idprod, qualidade, objetivo, quantidade, medidaCadastrada]
        // await client.query(queryEmpresaMaterial, valuesEmpresaMaterial)
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

    // const result = await pool.query(query, values)

    // if(result.rows.length == 0) {
    //     pool.query(queryMaterial, valuesMaterial)
    //     .then(async result => {
    //         const queryRes = await pool.query(query, values)
    //         console.log(queryRes)
    //     })
    //     .then(result => {
    //         // const idProd = result.rows.idProd
    //         console.log(result.rows)

    //         pool.query(queryEmpresaMaterial, valuesEmpresaMaterial)
    //         .then(result => {
    //             console.log('Material Cadastrado')
    //             res.sendStatus(200)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             res.sendStatus(400)
    //         })
    //     })
    //     .then(result => {
    //         console.log('Material Cadastrado')
    //         res.sendStatus(200)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.sendStatus(400)
    //     })
    // } else {
    //     pool.query(queryEmpresaMaterial, valuesEmpresaMaterial)
    //     .then(result => {
    //         console.log('Material Cadastrado')
    //         res.sendStatus(200)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.sendStatus(400)
    //     })
    // }
    // console.log(result.rows.length == 0)
    // pool.query(query, values)
    // .then(result => {
    //     // console.log('Material cadastrado')
    //     console.log(result);
    //     res.sendStatus(200)
    // })
    // .catch(err => {
    //     console.log(err)
    //     res.sendStatus(400)
    // })
    // const material_res = await Material.findOne({where: {nome: nome, qualidade: qualidade}})
    // if(material_res == null) {
    //     console.log('Nao achou')
    //     try {
    //         sequelize.transaction(async t => {
    //             const materialData = await Material.create({
    //                 qualidade: qualidade,
    //                 nome: nome,
    //                 unidade: unidade,
    //                 categoria: categoria
    //             }, {transaction: t})
    
    //             await EmpresaMaterial.create({
    //                 cnpj: cnpj,
    //                 idProd: materialData.idProd,
    //                 qualidade: qualidade,
    //                 // data: data,
    //                 objetivo: objetivo,
    //                 quantidade: quantidade,
    //                 medidaCadastrada: medidaCadastrada
    //             }, {transaction: t})
    
    //             // return materialData
    //         }).then(result => {
    //             console.log('Material cadastrado 1')
    //             res.sendStatus(200)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             res.sendStatus(400)
    //         })
    
    //     } catch (err) {
    //         console.log(err)
    //         res.sendStatus(500)
    //     }
    // } else {
    //     console.log('Achou')
    //     console.log(material_res)

    //     EmpresaMaterial.create({
    //         cnpj: cnpj,
    //         idProd: material_res.idProd,
    //         qualidade: qualidade,
    //         // data: data,
    //         objetivo: objetivo,
    //         quantidade: quantidade,
    //         medidaCadastrada: medidaCadastrada
    //     })
    //     .then(result => {
    //         console.log('Material cadastrado 2')
    //         res.sendStatus(200)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.sendStatus(400)
    //     })
    // }

    
}