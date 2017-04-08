import React, { Component, PropTypes } from 'react'

import h from '../../helpers/index.js'
import LaunchGrid from '../../components/LaunchGrid'


class AllLaunches extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      launches: []
    }
  }

  componentDidMount() {
    h.fetchMultipleLaunches(setLaunchState.bind(this),this.props.limit, ['spx','ula','nasa','asa','isro','casc'],'today')
    function setLaunchState(launches) {
      this.setState({
        loaded: true,
        launches: launches
      }, this.props.setPageHeight)

    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <LaunchGrid loaded={this.state.loaded} launches={this.state.launches}/>
      </div>
    )
  }
}

AllLaunches.propTypes = {
  limit: PropTypes.number.isRequired
}

export default AllLaunches
