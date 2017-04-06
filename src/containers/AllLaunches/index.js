import React, { Component, PropTypes } from 'react'

import h from '../../helpers/index.js'


class AllLaunches extends Component {
  componentDidMount() {
    h.fetchLaunches(this.props.limit,'ULA','today')
  }

  render() {
    return (
      <div className={this.props.className}>
        <h1>All Laucnhes</h1>
      </div>
    )
  }
}

AllLaunches.propTypes = {
  limit: PropTypes.number.isRequired
}

export default AllLaunches
