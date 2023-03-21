const { query } = require('express')
const pool = require('../database/dbConfig')


function addValues(arr, val, filterStr) {
    len = val.length
    filterStr += '('
    for(i in val) {
        arr.push(val[i])
        filterStr += '\''+ val[i] + '\''
        if(i < len-1) {
            filterStr += ', '
        }
    }
    filterStr += ') '

    return filterStr
}

exports.retrieveMaterial = (req, res, next) => {
    const qualidade = req.body.qualidade
    const objetivo = req.body.objetivo
    const categoria = req.body.categoria
    var values = []
    var filterValues = "WHERE "
    var hasVal = true

    if(categoria.length > 0) {
        filterValues += addValues(values, categoria, 'C.nomecategoria IN ')
    } else {
        hasVal = false
    }

    if(qualidade.length > 0) {
        if(hasVal) {
            filterValues += 'AND '
        }
        filterValues += addValues(values, qualidade, 'M.qualidade IN ')
        hasVal = true
    } else {
        hasVal = false
    }

    if(objetivo.length > 0) {
        if(hasVal) {
            filterValues += 'AND '
        }
        filterValues += addValues(values, objetivo, 'EM.objetivo IN ')
    }

    const selectMat = 'SELECT M.nome as MaterialNome, M.qualidade, EM.data, M.idprod, C.descricao, E.cnpj, E.nome as EmpresaNome, E.email, E.telefone, E.funcResponsavel, E.cep, E.cidade, E.estado, E.endereco, E.bairro, E.numeroEndereco, E.lat, E.long, EM.objetivo FROM ecoponto.material M JOIN ecoponto.empresamaterial EM ON M.idprod = EM.idprod JOIN ecoponto.empresa E ON E.cnpj = EM.cnpj JOIN ecoponto.categoria C ON C.idCategoria = M.categoria '
    const queryMat = selectMat + filterValues

    pool.query(queryMat)
    .then(material => {
        
        var unique = [...new Set(material.rows.map((item) => item.cnpj))]
        var filteredMat = []
        unique.forEach(id => {
            var objeto = {}
            objeto.materiais = []

            material.rows.forEach(data => {
                if(id === data.cnpj) {
                    if(!Object.hasOwn(objeto, 'cnpj')) {
                        objeto.cnpj = data.cnpj
                    }
                    objeto.empresanome = data.empresanome
                    objeto.email = data.email
                    objeto.funcresponsavel = data.funcresponsavel
                    objeto.telefone = data.telefone
                    objeto.cep = data.cep
                    objeto.cidade = data.cidade
                    objeto.estado = data.estado
                    objeto.endereco = data.endereco
                    objeto.bairro = data.bairro
                    objeto.numeroendereco = data.numeroendereco
                    objeto.lat = data.lat
                    objeto.long = data.long

                    var matObj = {}
                    matObj.idprod = data.idprod
                    matObj.materialnome = data.materialnome
                    matObj.descricao = data.descricao
                    matObj.qualidade = data.qualidade
                    matObj.objetivo = data.objetivo
                    matObj.data = data.data.toDateString()

                    objeto.materiais.push(matObj)
                }
            })
            filteredMat.push(objeto)
        })

        res.send(filteredMat)
    })
    .catch(err => {
        console.error(err.stack)
    })
}

exports.postMaterial = async (req, res, next) => {
    
    for(i in req.body) {
        const qualidade = req.body[i].qualidade
        const nome = req.body[i].nome
        const categoria = req.body[i].categoria
        const cnpj = req.body[i].cnpj
        const objetivo = req.body[i].objetivo

        const query = 'SELECT * FROM ecoponto.material M, ecoponto.empresa E WHERE E.cnpj = $1 AND M.qualidade = $2 AND M.nome = $3'
        const queryMaterial = 'INSERT INTO ecoponto.material(qualidade, nome, categoria) VALUES ($1, $2, $3) RETURNING idProd'
        const queryEmpresaMaterial = 'INSERT INTO ecoponto.empresamaterial(cnpj, idProd, qualidade, objetivo, categoria) VALUES ($1, $2, $3, $4, $5)'

        const values = [cnpj, qualidade, nome]
        const valuesMaterial = [qualidade, nome, categoria]

        const client = await pool.connect()

        try {
            await client.query('BEGIN')
            const queryRes = await client.query(query, values)

            if(queryRes.rows.length === 0) {
                const queryMat = await client.query(queryMaterial, valuesMaterial)

                const valuesEmpresaMaterial = [cnpj, queryMat.rows[0].idprod, qualidade, objetivo, categoria]
                await client.query(queryEmpresaMaterial, valuesEmpresaMaterial)


            } else {
                const valuesEmpresaMaterial = [cnpj, queryRes.rows[0].idprod, qualidade, objetivo, categoria]
                await client.query(queryEmpresaMaterial, valuesEmpresaMaterial)
            }

            console.log('Material Cadastrado')
            await client.query('COMMIT')
 
        } catch (e) {
            await client.query('ROLLBACK')
            console.log(e.stack)
            res.sendStatus(400)
            throw e
        } finally {
            client.release()
        }
    }

    res.sendStatus(200)
}