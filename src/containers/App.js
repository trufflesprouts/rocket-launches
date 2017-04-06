import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from '../components/Header'
import AllLaunches from './AllLaunches'
import MyFeed from './MyFeed'
import Search from './Search/index.js'
import Settings from './Settings'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      limit: 2
    }
  }

  setCurrentPage = (currentPage) => {
    this.setState({
      currentPage: currentPage
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <Route exact={true} path="/" render={() => (
            <AllLaunches limit={this.state.limit}/>
          )}/>
          <Route path="/my-feed" render={() => (
            <MyFeed limit={this.state.limit}/>
          )}/>
          <Route path="/search" render={() => (
            <Search limit={this.state.limit}/>
          )}/>
          <Route path="/settings" render={() => (
            <Settings limit={this.state.limit}/>
          )}/>
        </div>
      </Router>
    )
  }
}

export default App
