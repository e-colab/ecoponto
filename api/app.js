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
const indexRoutes = require('./routes/index')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

if(process.env.NODE_ENV === 'production') {
  console.log('NODE_ENV=production')
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

app.listen(PORT, () => {
  console.log(`Listening on port::${PORT}`)
})
