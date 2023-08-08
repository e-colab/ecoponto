const pool = require('../database/dbConfig')

async function hasDuplicates(arr) {
    for(i in arr.slice(0,-1)) {
        const cnpj = arr.at(-1).at(-1)
        const qualidade = arr.at(i).at(1).quality
        const nome = arr.at(i).at(1).name
        const objetivo = arr.at(i).at(1).objective
        const categoria = arr.at(i).at(1).material

        const selectOne = `SELECT M.idprod, M.qualidade, M.nome, C.descricao, EM.cnpj, EM.data, EM.objetivo FROM ecoponto.material M JOIN ecoponto.empresamaterial EM ON M.idprod = EM.idprod AND M.qualidade = EM.qualidade AND M.categoria = EM.categoria JOIN ecoponto.categoria C ON M.categoria = C.idcategoria WHERE EM.cnpj = $1 AND M.qualidade = $2 AND M.nome = $3 AND EM.objetivo = $4 AND C.descricao = $5`
        const filters = [cnpj, qualidade, nome, objetivo, categoria]

        const queryOne = await pool.query(selectOne, filters)
        if(queryOne.rows.length !== 0) {
            return queryOne.rows
        }
    }

    return []
}

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
    const qualidade = req.body.qualidade.length > 0 ? req.body.qualidade : ''
    const objetivo = req.body.objetivo.length > 0 ? req.body.objetivo : ''
    const categoria = req.body.categoria.length > 0 ? req.body.categoria : ''
    const latOrigin = req.body.lat
    const longOrigin = req.body.lon
    const distancia = req.body.distancia
    var values = []
    var filterValues = "WHERE "
    var hasCat = true
    var hasQual = true
    var hasObj = true
    var calcDist = false

    if(categoria != '') {
        filterValues += addValues(values, categoria, 'C.descricao IN ')
        calcDist = true
    } else {
        hasCat = false
    }

    if(qualidade != '') {
        if(hasCat) {
            filterValues += 'AND '
        }
        filterValues += addValues(values, qualidade, 'M.qualidade IN ')
        calcDist = true
    } else {
        hasQual = false
    }

    if(objetivo != '') {
        if(hasCat || hasQual) {
            filterValues += 'AND '
        }
        filterValues += addValues(values, objetivo, 'EM.objetivo IN ')
        calcDist = true
    } else {
        hasObj = false
    }

    if(hasCat || hasQual || hasObj) {
        filterValues += 'AND '
    }
    
    if(calcDist) {
        filterValues += ` (ST_Distance(
            ST_Transform('SRID=4326;POINT(${latOrigin} ${longOrigin})'::geometry, 3857)
        ,ST_Transform(concat('SRID=4326;POINT(', E.lat, ' ', E.long,')')::geometry, 3857)) / 1000) < ${distancia}`
    }

    const selectMat = `SELECT M.nome as MaterialNome, M.qualidade, EM.data, M.idprod, C.descricao, E.cnpj, E.nome as EmpresaNome, E.email, E.telefone, E.funcResponsavel, E.cep, E.cidade, E.estado, E.endereco, E.bairro, E.numeroEndereco, E.lat, E.long, EM.objetivo, (ST_Distance(ST_Transform('SRID=4326;POINT(${latOrigin} ${longOrigin})'::geometry, 3857), ST_Transform(concat('SRID=4326;POINT(', E.lat, ' ', E.long,')')::geometry, 3857)) / 1000) as raio_dist FROM ecoponto.material M JOIN ecoponto.empresamaterial EM ON M.idprod = EM.idprod JOIN ecoponto.empresa E ON E.cnpj = EM.cnpj JOIN ecoponto.categoria C ON C.idCategoria = M.categoria `
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
                    objeto.raio_dist = data.raio_dist

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
        res.send([])
    })
}

exports.postMaterial = async (req, res, next) => {
    const arr = Object.entries(req.body.array[0])

    const isDuplicate = await hasDuplicates(arr)

    if(isDuplicate.length !== 0) {
        for(obj in isDuplicate) {
            return res.status(400).json({error: 'Material já existente: ' + isDuplicate[obj].nome + ', ' + isDuplicate[obj].descricao + ', ' + isDuplicate[obj].objetivo + ', ' + isDuplicate[obj].qualidade})
        }
    }

    const client = await pool.connect()
    try {

        await client.query('BEGIN')
        for(i in arr.slice(0,-1)) {
            const qualidade = arr.at(i).at(1).quality
            const nome = arr.at(i).at(1).name
            const categoria = arr.at(i).at(1).material
            const cnpj = arr.at(-1).at(-1)
            const objetivo = arr.at(i).at(1).objective

            const selectFields = 'SELECT * FROM ecoponto.material M, ecoponto.empresa E WHERE E.cnpj = $1 AND M.qualidade = $2 AND M.nome = $3'
            const selectCat = `SELECT idCategoria FROM ecoponto.categoria C WHERE C.descricao = '${categoria}'`

            const insertMaterial = 'INSERT INTO ecoponto.material(qualidade, nome, categoria) VALUES ($1, $2, $3) RETURNING idProd'
            const insertEmpresaMaterial = 'INSERT INTO ecoponto.empresamaterial(cnpj, idProd, qualidade, objetivo, categoria) VALUES ($1, $2, $3, $4, $5)'

            const values = [cnpj, qualidade, nome]
        
        
            const queryFields = await client.query(selectFields, values)
            
            if(queryFields.rows.length === 0) {
                const queryCat = await client.query(selectCat)

                const valuesMaterial = [qualidade, nome, queryCat.rows[0].idcategoria]
                const queryMat = await client.query(insertMaterial, valuesMaterial)

                const valuesEmpresaMaterial = [cnpj, queryMat.rows[0].idprod, qualidade, objetivo, queryCat.rows[0].idcategoria]
                await client.query(insertEmpresaMaterial, valuesEmpresaMaterial)


            } else {
                const queryCat = await client.query(selectCat)
                const valuesEmpresaMaterial = [cnpj, queryFields.rows[0].idprod, qualidade, objetivo, queryCat.rows[0].idcategoria]
                await client.query(insertEmpresaMaterial, valuesEmpresaMaterial)
            }
            await client.query('COMMIT')
        }
 
    } catch (e) {
        await client.query('ROLLBACK')
        res.status(400).json({error: 'Erro ao cadastrar material.'})
    } finally {
        client.release()
    }

    res.sendStatus(200)
}