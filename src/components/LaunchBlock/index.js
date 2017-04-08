import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import './LaunchBlock.css'

const LaunchBlock = (props) => {
  return (
    <Link to={`/launch/${props.agencyAbbrev}/${props.id}`}>
      <div className={`LaunchBlock ${props.className}`}>
        <h6>{props.agency}</h6>
        <p>{props.rocket}</p>
        <p>{props.name}</p>
        <p>{props.date}</p>
      </div>
    </Link>
  )
}


LaunchBlock.propTypes = {
  showDetailsCard: PropTypes.func.isRequired,
  agency: PropTypes.string.isRequired,
  rocket: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}

export default LaunchBlock
