// const Material = require('../models/material')
// const EmpresaMaterial = require('../models/empresamaterial')
// const Empresa = require('../models/empresa')
// const Categoria = require('../models/categoria')
const pool = require('../database/dbConfig')


exports.getMaterial = (req, res, next) => {
    Material.findAll({
        attributes: ['nome', 'qualidade', 'unidade', 'data'],
        include: [
            {model: Empresa, as: 'EmpresaID', attributes: ['cnpj', 'nome', 'email', 'telefone', 'funcResponsavel', 'cep', 'cidade', 'estado', 'endereco', 'bairro', 'numeroEndereco', 'lat', 'long']},
            {model: Categoria, as: 'CategoriaID', attributes: ['nomeCategoria', 'descricao']},
        ]
    })
    .then(result => {
        let resultado = []

        for(let i in result) {
            let materialDetail = {}
            materialDetail.nomeProduto = result[i].nome,
            materialDetail.qualidade = result[i].qualidade,
            materialDetail.unidade = result[i].unidade,
            materialDetail.data = result[i].data,
            materialDetail.nomeCategoria = result[i].CategoriaID.nomeCategoria

            for(let j in result[i].EmpresaID) {
                materialDetail.cnpj = result[i].EmpresaID[j].cnpj,
                materialDetail.nomeEmpresa = result[i].EmpresaID[j].nome,
                materialDetail.email = result[i].EmpresaID[j].email,
                materialDetail.telefone = result[i].EmpresaID[j].telefone,
                materialDetail.funcResponsavel = result[i].EmpresaID[j].funcResponsavel,
                materialDetail.cep = result[i].EmpresaID[j].cep,
                materialDetail.cidade = result[i].EmpresaID[j].cidade,
                materialDetail.estado = result[i].EmpresaID[j].estado,
                materialDetail.endereco = result[i].EmpresaID[j].endereco,
                materialDetail.bairro = result[i].EmpresaID[j].bairro,
                materialDetail.numeroEndereco = result[i].EmpresaID[j].numeroEndereco,
                materialDetail.lat = result[i].EmpresaID[j].lat,
                materialDetail.long = result[i].EmpresaID[j].long,
                materialDetail.tipoAcao = result[i].EmpresaID[j].empresamaterial.tipoAcao,
                materialDetail.quantidade = result[i].EmpresaID[j].empresamaterial.quantidade,
                materialDetail.medidaCadastrada = result[i].EmpresaID[j].empresamaterial.medidaCadastrada
            }
            
            resultado.push(materialDetail)
        }
        return resultado
    })
    .then(row => {
        res.json(row)
    })
    .catch(err => {
        console.log(err)
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
    const tipoAcao = req.body.tipoAcao
    const quantidade = req.body.quantidade
    const medidaCadastrada = req.body.medidaCadastrada

    const query = 'SELECT * FROM ecoponto.material M, ecoponto.empresa E WHERE E.cnpj = $1 AND M.qualidade = $2 AND M.nome = $3'
    const queryMaterial = 'INSERT INTO ecoponto.material(qualidade, nome, unidade, categoria) VALUES ($1, $2, $3, $4)'
    const queryEmpresaMaterial = 'INSERT INTO ecoponto.empresamaterial(cnpj, idProd, qualidade, tipoAcao, quantidade, medidaCadastrada) VALUES ($1, $2, $3, $4, $5, $6)'

    const values = [cnpj, unidade, nome]
    const valuesMaterial = [qualidade, nome, unidade, categoria]

    const result = await pool.query(query, values)

    if(result.rows.length == 0) {
        pool.query(queryMaterial, valuesMaterial)
        .then(async result => {
            const queryRes = await pool.query(query, values)
            console.log(queryRes)
        })
        .then(result => {
            // const idProd = result.rows.idProd
            console.log(result.rows)
            const valuesEmpresaMaterial = [cnpj, qualidade, tipoAcao, quantidade, medidaCadastrada]

            pool.query(queryEmpresaMaterial, valuesEmpresaMaterial)
            .then(result => {
                console.log('Material Cadastrado')
                res.sendStatus(200)
            })
            .catch(err => {
                console.log(err)
                res.sendStatus(400)
            })
        })
        .then(result => {
            console.log('Material Cadastrado')
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
    } else {
        pool.query(queryEmpresaMaterial, valuesEmpresaMaterial)
        .then(result => {
            console.log('Material Cadastrado')
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
    }
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
    //                 tipoAcao: tipoAcao,
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
    //         tipoAcao: tipoAcao,
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