const http = require('http')
const path = require('path')
const db = require('./configs/db')
const consign = require('consign')
const express = require('express')
const app = express()
let port = 8100

consign({
    cwd: __dirname,
    locale: 'en-us',
    logger: console,
    verbose: true,
    extensions: ['.js', '.json', '.node'],
    loggingType: 'info'
})
    .include('./configs/middlewares.js')
    .then('./api')
    .then('./configs/routes.js')
    .into(app)

// Acesso ao knex (database)
app.db = db

if (process.env.NODE_ENV === 'production') {
    console.log('Rodando em produção..')
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../../frontend')))
    // Handle React routing, return all requests to React App
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../frontend', 'index.html'))
    })

    https.createServer({}, app).listen(port)
} else {
    http.createServer({}, app).listen(port)
}

// Running message
console.log(`Running at: ${port}`)