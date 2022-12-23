const Material = require('../models/material')
const EmpresaMaterial = require('../models/empresamaterial')
const Empresa = require('../models/empresa')
const sequelize = require('../database/dbConfig')
const Categoria = require('../models/categoria')


exports.getMaterial = (req, res, next) => {
    Material.findAll({
        attributes: ['nome', 'qualidade', 'unidade', 'data'],
        include: [
            {model: Empresa, as: 'EmpresaID', attributes: ['cnpj', 'nome', 'email', 'telefone', 'funcResponsavel', 'cep', 'cidade', 'estado', 'endereco', 'bairro', 'numeroEndereco', 'lat', 'long']},
            {model: Categoria, as: 'CategoriaID', attributes: ['nomeCategoria', 'descricao']},
            // {model: EmpresaMaterial, as: 'EmpresaMaterialID'}

        ]
    })
    .then(result => {
        let resultado = []
        // resultado.push(result[0].nome)
        let materialDetail = {}
        for(let i in result) {
            materialDetail.nomeProduto = result[i].nome,
            materialDetail.qualidade = result[i].qualidade,
            materialDetail.unidade = result[i].unidade,
            materialDetail.data = result[i].data,
            materialDetail.nomeCategoria = result[i].CategoriaID.nomeCategoria

            for(let j in result[i].EmpresaID) {
                console.log(j)
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
        // console.log(resultado)
        return resultado
    })
    .then(row => {
        console.log(row)
        res.json(row)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.postMaterial = (req, res, next) => {
    
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

    try {
        sequelize.transaction(async t => {
            const materialData =  await Material.create({
                qualidade: qualidade,
                nome: nome,
                unidade: unidade,
                categoria: categoria
            }, {transaction: t})

            const empresaData = await EmpresaMaterial.create({
                cnpj: cnpj,
                idProd: materialData.idProd,
                qualidade: qualidade,
                // data: data,
                tipoAcao: tipoAcao,
                quantidade: quantidade,
                medidaCadastrada: medidaCadastrada
            }, {transaction: t})

            return materialData
        }).then(result => {
            console.log('EmpresaMaterial cadastrado')
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    
}