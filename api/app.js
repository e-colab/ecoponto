const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const empresaRoutes = require('./routes/empresa')
const materialRoutes = require('./routes/material')
const categoriaRoutes = require('./routes/categoria')
const empresamaterialRoutes = require('./routes/empresamaterial')
const localizacaoRoutes = require('./routes/localizacao')
const objetivoRoutes = require('./routes/objetivo')
const qualidadeRoutes = require('./routes/qualidade')
const indexRoutes = require('./routes/index')



app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.options('*', cors())
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://empresas.e-colab.ufscar.br")
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
    app.use(cors())
    next()
  })
  console.log('NODE_ENV = ' + process.env.NODE_ENV)
  app.use(express.static(path.join(__dirname, '../app/dist')))

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/dist/index.html'))
  })
} else {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
    app.use(cors())
    next()
  })
  app.use('/api', indexRoutes)

}

app.use('/api', empresaRoutes)
app.use('/api', materialRoutes)
app.use('/api', categoriaRoutes)
app.use('/api', empresamaterialRoutes)
app.use('/api', localizacaoRoutes)
app.use('/api', objetivoRoutes)
app.use('/api', qualidadeRoutes)

app.listen(PORT, () => {
  console.log(`Listening on port::${PORT}`)
})
