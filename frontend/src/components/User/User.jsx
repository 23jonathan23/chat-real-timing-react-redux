import React from 'react'

import './styles.css'

export default  props =>
  <div className="user">
    <h3>Seja bem vindo! <span>{props.user}</span></h3>
  </div>