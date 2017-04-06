import React, { Component } from 'react'
import h from '../helpers'
import './App.css'

import SliderNav from '../components/SliderNav'
import Header from '../components/Header'
import AllLaunches from './AllLaunches'
import MyFeed from './MyFeed'
import Search from './Search/index.js'
import Settings from './Settings'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: h.pageRefConverter(this.props.location.pathname) || 0,
      limit: 15
    }
  }


  setCurrentPage = (currentPage) => {
    this.props.history.push(h.pageRefConverter(currentPage))
    this.setState({
      currentPage: currentPage
    })
  }

  render() {
    return (
      <div className='App'>
        <Header currentPage={this.state.currentPage} setCurrentPage={this.setCurrentPage}/>
        <SliderNav currentPage={this.state.currentPage} setCurrentPage={this.setCurrentPage}>
          <AllLaunches limit={this.state.limit}/>
          <MyFeed limit={this.state.limit}/>
          <Search limit={this.state.limit}/>
          <Settings limit={this.state.limit}/>
        </SliderNav>
      </div>
    )
  }
}

export default App
