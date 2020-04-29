//Importação do banco de dados
const db = require('./config/database')

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.origins(['http://localhost:3000']) //Definindo qual client podera se conectar

const port = 3003

//Armazena as messagens do chat
let messages = []

//Responsavel por carregar as messagem armazenadas no banco de dados
async function findMessages() {
  await db.find().then(res => {
    messages = []
    let msg = res
    msg.map(msg => {
      messages.push(msg.message)
    })
  })
}

//Recebe as conexões
io.on('connection', socket => {
  console.log(`Socket conectado: ${socket.id}`)

  //Carrega as messagem armazenadas no banco de dados
  findMessages()

  //Envia as messagem anteriores ao usuario conectado
  socket.emit('previousMessages', messages)

  //Recebe as messagem enviadas por cada usuario
  socket.on('sendMessage', data => {
    let dataMsg = new db({ username: data.username, message: data.message, date: data.date })
    //Persiste a mensagem no banco de dados
    dataMsg.save()
    //Envia a messagem a todos usuario conectados
    socket.broadcast.emit('receivedMessage', data.message)
  })

})

server.listen(port, () => {
  console.log(`Server Socket.io executando na ${port}`)
})