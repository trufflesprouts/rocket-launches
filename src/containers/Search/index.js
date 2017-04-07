import React, { Component, PropTypes } from 'react'
import ReactBodymovin from 'react-bodymovin'
import Select from 'react-select'
import moment from 'moment'


import 'react-select/dist/react-select.css'
import './Search.css'

import h from '../../helpers/index.js'
import DATA from '../../data'
import spinner from '../../data/loader.json'

import LaunchBlock from '../../components/LaunchBlock'
import Button from '../../components/Button'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().add(1, 'months').format('YYYY-MM-DD'),
      options: [],
      value: null,
      loaded: true,
      clickedSearch: false,
      launches: {},
    }
  }

  componentDidMount() {
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

  onSearchClick = () => {
    this.setState({
      loaded: false
    })
    const agencies = this.state.value.split(',')
    h.fetchMultipleLaunches(setLaunchState.bind(this),this.props.limit, agencies, this.state.startDate, this.state.endDate)
    function setLaunchState(launches) {
      this.setState({
        loaded: true,
        launches: launches,
        clickedSearch: true
      })
    }
  }

  handleChangeStart = (event) => {
    this.setState({
      startDate: event.target.value
    })
  }

  handleChangeEnd = (event) => {
    this.setState({
      endDate: event.target.value
    })
  }

  formatDateStart = (event) => {
    let newDate = moment(event.target.value).format('YYYY-MM-DD')
    if (newDate === 'Invalid date') {
      newDate = moment().format('YYYY-MM-DD')
    }
    this.setState({
      startDate: newDate
    })
  }

  formatDateEnd = (event) => {
    let newDate = moment(event.target.value).format('YYYY-MM-DD')
    if (newDate === 'Invalid date') {
      newDate = moment().add(1, 'months').format('YYYY-MM-DD')
    }
    this.setState({
      endDate: newDate
    })
  }

  handleSelectChange = (value) => {
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
      <div className={`Search ${this.props.className}`}>
        <div className='search-panel'>
          <h6>Agency:</h6>
          <Select
            multi
            simpleValue
            value={this.state.value}
            placeholder="Select your favourite(s)"
            options={this.state.options}
            onChange={this.handleSelectChange}
            searchable={false}
          />
          <h6>Launch Window:</h6>
          <input className='date' value={this.state.startDate} onChange={this.handleChangeStart} onBlur={this.formatDateStart} type="text"/>
          <input className='date' value={this.state.endDate} onChange={this.handleChangeEnd} onBlur={this.formatDateEnd} type="text"/>

          <Button onClick={this.onSearchClick} size='big' color='blue'>Search</Button>
        </div>

        {!this.state.loaded && <ReactBodymovin options={bodymovinOptions}/>}
        {this.state.clickedSearch && this.state.launches.map((launch, i) => <LaunchBlock key={i} className={launch.agencyAbbrev} agency={launch.agency} rocket={launch.rocket} name={launch.name} date={launch.date}/>)}
      </div>
    )
  }
}

Search.propTypes = {
  limit: PropTypes.number.isRequired
}

export default Search
