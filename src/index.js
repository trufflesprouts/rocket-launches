import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import App from './containers/App'

import './index.css'


const Index = () => {
  return (
    <Router>
      <Route path="/" component={App}/>
    </Router>
  )
}

ReactDOM.render(
  <Index/>,
  document.getElementById('root')
)
