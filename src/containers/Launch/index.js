import React, { Component, PropTypes } from 'react'
import './Launch.css'
import h from '../../helpers/index.js'

class Launch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      launchDetails: {}
    }
  }

  componentDidMount() {
    h.fetchLaunchDetails(setLaunchState.bind(this), this.props.match.params.id, this.props.match.params.agency)
    function setLaunchState(launchDetails) {
      console.log(launchDetails);
      this.setState({
        loaded: true,
        launchDetails: launchDetails
      })

    }
  }

  render() {
    return (
      <div className="launch-details">
        <button onClick={this.props.history.goBack}>X</button>
        {this.props.match.params.agency}
        {this.props.match.params.id}
      </div>
    )
  }
}

// Launch.propTypes = {
//   id: PropTypes.number.isRequired,
//   agency: PropTypes.string.isRequired
// }

export default Launch
