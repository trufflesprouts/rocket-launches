import React, { Component, PropTypes } from 'react'

import h from '../../helpers/index.js'


class AllLaunches extends Component {
  render() {
    return (
      <div>
        <h1>All Laucnhes</h1>
        {h.fetchLaunches(this.props.limit,'ULA','today')}
      </div>
    )
  }
}

AllLaunches.propTypes = {
  limit: PropTypes.number.isRequired
}

export default AllLaunches
