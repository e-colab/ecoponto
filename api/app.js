const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sequelize = require('./database/dbConfig')

const Empresa = require('./models/empresa')
const Material = require('./models/material')
const EmpresaMaterial = require('./models/empresamaterial')
const Categoria = require('./models/categoria')



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

app.use('/api', empresaRoutes)
app.use('/api', materialRoutes)
app.use('/api', categoriaRoutes)
app.use('/api', indexRoutes)

Empresa.belongsToMany(Material, {through: EmpresaMaterial, foreignKey: 'cnpj', as:'MaterialID'})
Material.belongsToMany(Empresa, {through: EmpresaMaterial, foreignKey: 'idProd', as: 'EmpresaID'})

Material.belongsTo(Categoria, {foreignKey: 'categoria', as: 'CategoriaID', onDelete: 'CASCADE'})

sequelize
  // .sync({force: true})
  .sync()
  .then(result => {
    console.log(result)
    app.listen(3000)
  })
  .catch(err => {
    console.log(err)
  })