const pool = require('../database/dbConfig')


exports.getMaterial = (req, res, next) => {

    pool.query('SELECT M.nome, M.qualidade, EM.data, C.descricao, E.cnpj, E.nome, E.email, E.telefone, E.funcResponsavel, E.cep, E.cidade, E.estado, E.endereco, E.bairro, E.numeroEndereco, E.lat, E.long, EM.objetivo, EM.quantidade, EM.medidaCadastrada FROM ecoponto.material M JOIN ecoponto.empresamaterial EM ON M.idprod = EM.idprod JOIN ecoponto.empresa E ON E.cnpj = EM.cnpj JOIN ecoponto.categoria C ON C.idCategoria = M.categoria')
    .then(material => {
        console.log(material.rows)
        res.send(material.rows)
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