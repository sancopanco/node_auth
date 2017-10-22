const express =  require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()

const router = require('./router.js')
const mongoose = require('mongoose')

//DB setup
mongoose.connect('mongodb://localhost:auth/auth')


//App setup

//logging
app.use(morgan('combined'))
app.use(bodyParser.json({type: '*/*'}))
router(app)

//Server setup


const port = process.env.port || 3090
const server = http.createServer(app)
server.listen(port)

console.log('Server Listening on:', port)



