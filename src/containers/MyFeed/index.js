import React, { Component, PropTypes } from 'react'
import ReactBodymovin from 'react-bodymovin'
import spinner from '../../data/loader.json'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import h from '../../helpers/index.js'
import DATA from '../../data'
import LaunchBlock from '../../components/LaunchBlock'

class MyFeed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      value: null,
      loaded: false,
      launches: {}
    }
  }

  componentDidMount() {
    h.fetchMultipleLaunches(setLaunchState.bind(this),this.props.limit, ['spx','ula','nasa','asa','isro','casc'],'today')
    function setLaunchState(launches) {
      this.setState({
        loaded: true,
        launches: launches
      })
    }

    this.setState({
      options: this.agencyOptions(DATA.agenciesDictionary)
    })
  }

  agencyOptions = (data) => {
    const options = []
    Object.keys(data).forEach(key => {
      options.push({ value: key, label: data[key] })
    })
    return options
  }

  handleSelectChange = (value) => {
    console.log('You\'ve selected:', value)
    this.setState({value: value})
  }

  render() {
    const bodymovinOptions = {
      loop: true,
      autoplay: true,
      prerender: true,
      animationData: spinner
    }

    return (
      <div className={this.props.className}>
        <Select
          multi
          simpleValue
          value={this.state.value}
          placeholder="Select your favourite(s)"
          options={this.state.options}
          onChange={this.handleSelectChange}
        />
        {!this.state.loaded && <ReactBodymovin options={bodymovinOptions}/>}
        {this.state.loaded && this.state.launches.map((launch, i) => <LaunchBlock key={i} className={launch.agencyAbbrev} agency={launch.agency} rocket={launch.rocket} name={launch.name} date={launch.date}/>)}
      </div>
    )
  }
}

MyFeed.propTypes = {
  limit: PropTypes.number.isRequired
}

export default MyFeed
