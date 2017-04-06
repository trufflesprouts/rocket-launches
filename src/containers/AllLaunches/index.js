import React, { Component, PropTypes } from 'react'

import h from '../../helpers/index.js'
import LaunchBlock from '../../components/LaunchBlock'


class AllLaunches extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.state.loaded && this.state.launches.map((launch, i) => <LaunchBlock key={i} className={launch.agencyAbbrev} agency={launch.agency} rocket={launch.rocket} name={launch.name} date={launch.date}/>)}
      </div>
    )
  }
}

AllLaunches.propTypes = {
  limit: PropTypes.number.isRequired
}

export default AllLaunches
