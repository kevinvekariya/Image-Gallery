import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Gallary from './containers/Gallery'
import Favourite from './containers/Gallery/Layouts/Favourite'

function App () {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact component={Gallary} />
          <Route path='/favourite' component={Favourite} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
