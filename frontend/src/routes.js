import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import Home from './pages/Home/Home.jsx'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Redirect from="*" to="/"/>
      </Switch>
    </BrowserRouter>
  )
}