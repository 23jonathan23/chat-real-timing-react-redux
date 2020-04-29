import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './styles.css'

export default function Login(props) {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')

  const history = useHistory()

  function onChangeUsername(e) {
    setUsername(e.target.value)
  }

  function makeLogin() {
    dispatch({ type: 'LOGIN_USER', userlogin: username })
    dispatch({ type: 'LOGIN_VISIBLE', islogin: true })
    history.push('/chat')
  }

  return (
    <div className="container-login">
      <div className="login">
        <h1>Chat online com os amigos!</h1>
        <input value={username} onChange={onChangeUsername} type="text" placeholder='Diga-nos o seu nome...' />
        <button onClick={makeLogin}>Avançar</button>
      </div>

    </div>
  )
}