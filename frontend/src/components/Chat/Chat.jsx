import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import './styles.css'

export default function Chat(props) {

  //Recebendo e armazenando as messagens anteriores
  const previousMessages = useSelector(state => state.previousMessages)

  const username = props.user
  const [msg, setMsg] = useState('')
  const [msgsChat, setMsgsChat] = useState([...previousMessages])

  //Responsavel por receber as messagens atuais
  props.socket.on('receivedMessage', message => {
    setMsgsChat([...msgsChat, message])
  })

  //Gera a hora e minutos formatados
  function newHours() {
    function pad(s) {
      return (s < 10) ? '0' + s : s;
    }
    var date = new Date();
    return [date.getHours(), date.getMinutes()].map(pad).join(':');
  }

  //Gera o DD/MM/YY
  function newDateNow() {
    var dNow = new Date();
    var localdate = dNow.getDate() + '/' + (dNow.getMonth() + 1) + '/' + dNow.getFullYear();
    return localdate;
  }

  function onSubmit(e) {
    e.preventDefault()

    let author = username
    let message = msg

    let messageObject

    let date = newDateNow()
    let hours = newHours()

    if (author.length && message.length) {
      messageObject = {
        username: author,
        message: {
          date,
          author,
          hours,
          message
        },
        date: date
      }
    }

    //Mandando mensagem
    props.socket.emit('sendMessage', messageObject)

    setMsgsChat([...msgsChat, messageObject.message])

    setMsg('')

  }

  function onChangeMsg(e) {
    setMsg(e.target.value)
  }

  return (
    <div className="chat">
      <div className="messages">
        {msgsChat.map((message, index) => (
          <div className="message" key={index}>
            <strong>{message.date} - {message.author} - {message.hours} => </strong><span>{message.message}</span>
          </div>
        ))}
      </div>
      <div className="send-message">
        <input value={msg} onChange={onChangeMsg} name="message" type="text" placeholder="Fala com a galera..." />
        <button onClick={onSubmit}>Enviar</button>
      </div>
    </div>
  )
}