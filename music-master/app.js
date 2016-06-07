const express = require('express')

const app = express()

app.use(express.static('./client'))
app.use('/node_modules', express.static('./node_modules'))

const router = require('./server')

router(app)

const server = app.listen(2080, error => {
  if (error) throw error
  const address = server.address();
  console.log(`server is ready @http://${address.address}:${address.port}`)
})
