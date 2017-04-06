import React, { Component, PropTypes } from 'react'
import './LaunchBlock.css'

class LaunchBlock extends Component {
  render() {
    return (
      <div className={`LaunchBlock ${this.props.className}`}>
        <h5>{this.props.agency}</h5>
        <p>{this.props.rocket}</p>
        <p>{this.props.name}</p>
        <p>{this.props.date}</p>
      </div>
    )
  }
}

LaunchBlock.propTypes = {
  // prop: PropTypes.func.isRequired
}

export default LaunchBlock
