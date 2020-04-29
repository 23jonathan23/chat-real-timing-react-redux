import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import io from 'socket.io-client'

import './styles.css'
import Login from '../../components/Login/Login'
import Chat from '../../components/Chat/Chat.jsx'
import User from '../../components/User/User.jsx'

const socketUrl = 'http://localhost:3003'
const socket = io(socketUrl)

export default function Home() {

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.user)
  const isLogin = useSelector(state => state.isLogin)

  socket.on('previousMessages', messages => {
    let msg = []
    msg.push(...messages)
    dispatch({ type: 'PREVIOUS_MESSAGES', messages: msg })
  })

  return (
    <div className="container-home">
      {!isLogin && <Login />}
      {isLogin && <h1 className="title">Chat online</h1>}
      {isLogin && <h2 className="subtitle">Converse com seus amigos atráves de nosso chat em tempo real</h2>}
      {isLogin && <div className="container-chat">
        <User user={userLogin} />
        <Chat user={userLogin} socket={socket}/>
      </div>}
    </div>
  )
}