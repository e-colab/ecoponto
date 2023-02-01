const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

// const sequelize = require('./database/dbConfig')
// const pool = require('./database/dbConfig')

// const Empresa = require('./models/empresa')
// const Material = require('./models/material')
// const EmpresaMaterial = require('./models/empresamaterial')
// const Categoria = require('./models/categoria')

const PORT = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const empresaRoutes = require('./routes/empresa')
const materialRoutes = require('./routes/material')
const categoriaRoutes = require('./routes/categoria')
const indexRoutes = require('./routes/index')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

if(process.env.NODE_ENV === 'prod') {
  app.use(express.static(path.join(__dirname, '../app/dist')))

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/dist/index.html'))
  })
} else {
  app.use('/api', indexRoutes)

}

app.use('/api', empresaRoutes)
app.use('/api', materialRoutes)
app.use('/api', categoriaRoutes)

// Empresa.belongsToMany(Material, {through: EmpresaMaterial, foreignKey: 'cnpj', as:'MaterialID'})
// Material.belongsToMany(Empresa, {through: EmpresaMaterial, foreignKey: 'idProd', as: 'EmpresaID'})

// Material.belongsTo(Categoria, {foreignKey: 'categoria', as: 'CategoriaID', onDelete: 'CASCADE'})

// pool.connect()
// pool.query('SELECT * FROM ecoponto.empresa', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

app.listen(PORT, () => {
  console.log(`Listening on port::${PORT}`)
})

// sequelize
//   // .sync({force: true})
//   // .sync()
//   .then(result => {
//     console.log(result)
//     app.listen(PORT, () => {
//       console.log(`Listening on port::${PORT}`)
//     })
//   })
//   .catch(err => {
//     console.log(err)
//   })