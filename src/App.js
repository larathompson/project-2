import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Songs from './components/Songs'


import Search from './components/Search'

import 'bulma'
import './styles/style.scss'

const App = () => {
  return <HashRouter>
    {/* <NavBar/> */}
    <Switch>

      <Route exact path='/search/' component={Search} />
      <Route exact path='/search/:id' component={Songs} />
      

    </Switch>
  </HashRouter>
}



export default App