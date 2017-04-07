import React, { Component } from 'react'
import h from '../helpers'
import './App.css'

import SliderNav from '../components/SliderNav'
import Header from '../components/Header'
import AllLaunches from './AllLaunches'
// import MyFeed from './MyFeed'
import Search from './Search/index.js'
import Settings from './Settings'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      appHeight: '',
      currentPage: h.pageRefConverter(this.props.location.pathname) || 0,
      limit: 15,
      theme: 'white'
    }
  }

  componentDidMount() {
    this.setPageHeight(this.state.currentPage)
  }

  setPageHeight = () => {
    const currentPage = this.state.currentPage
    const pageEls = Array.from(document.getElementsByClassName('NavSlider-body__panel'))
    const pageHeight = h.getAbsoluteHeight(pageEls[currentPage])
    this.setState({
      appHeight: pageHeight + pageEls[currentPage].offsetTop + 20
    })
  }

  setCurrentPage = (currentPage) => {
    this.props.history.push(h.pageRefConverter(currentPage))
    this.setState({
      currentPage: currentPage
    }, this.setPageHeight)
  }

  setLimit = (newLimit) => {
    let limitInt = parseInt(newLimit, 10) || 0
    limitInt = limitInt > 50 ? 50 : limitInt
    this.setState({
      limit: limitInt
    })
  }

  setTheme = (newTheme) => {
    this.setState({
      theme: newTheme.value
    })
  }

  render() {
    return (
      <div className={`App-container ${this.state.theme}`}>
        <div className={'App'} style={{
          height: `${this.state.appHeight}px`
        }}>
          <Header currentPage={this.state.currentPage} setCurrentPage={this.setCurrentPage}/>
          <SliderNav currentPage={this.state.currentPage} setCurrentPage={this.setCurrentPage}>
            <AllLaunches setPageHeight={this.setPageHeight} limit={this.state.limit}/>
            <Search setPageHeight={this.setPageHeight} limit={this.state.limit}/>
            <Settings limit={this.state.limit} setLimit={this.setLimit} theme={this.state.theme} setTheme={this.setTheme}/>
          </SliderNav>
        </div>
      </div>
    )
  }
}

export default App
