import React, { PropTypes } from 'react'
import './LaunchBlock.css'

const LaunchBlock = (props) => {
  return (
    <div className={`LaunchBlock ${props.className}`}>
      <h5>{props.agency}</h5>
      <p>{props.rocket}</p>
      <p>{props.name}</p>
      <p>{props.date}</p>
    </div>
  )
}

LaunchBlock.propTypes = {
  agency: PropTypes.string.isRequired,
  rocket: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}

export default LaunchBlock
