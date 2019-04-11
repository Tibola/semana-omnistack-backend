const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors())

const server = require('http').Server(app)
const io = require('socket.io')(server)
const PORT = 3000

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box)
  })
})

mongoose.connect('mongodb+srv://omnistack:batatabatata@cluster0-kwgpt.mongodb.net/omnistack?retryWrites=true', {
  useNewUrlParser: true
})

app.use((req, res, next) => {
  // cria um novo atributo no objeto req contendo as informações do io do socket
  req.io = io
  return next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes'))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

server.listen(process.env.PORT || PORT)