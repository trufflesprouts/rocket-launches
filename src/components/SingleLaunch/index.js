import React, { Component } from 'react';
import './SingleLaunch.css';
import closeBtn from './close.svg';
import h from '../../helpers/index.js';

class SingleLaunch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      launchDetails: {},
    };
  }

  componentDidMount() {
    h.fetchLaunchDetails(
      setLaunchState.bind(this),
      this.props.match.params.id,
      this.props.match.params.agency,
    );
    function setLaunchState(newLaunchDetails) {
      this.setState({
        loaded: true,
        launchDetails: newLaunchDetails,
      });
    }
  }

  render() {
    return (
      <div className="disableBackground">
        <div
          className={`launch-details ${this.state.launchDetails.agencyAbbrev}`}
        >
          <div onClick={this.props.history.goBack}>
            <img src={closeBtn} className="no-select" alt="x" />
          </div>
          <h5>{this.state.launchDetails.agency}</h5>
          <h6>Rocket</h6>
          <p>{this.state.launchDetails.rocket}</p>
          <h6>Mission</h6>
          <p>{this.state.launchDetails.mission}</p>
          <h6>Description</h6>
          <p>{this.state.launchDetails.missionDescription}</p>
          <h6>Time</h6>
          <p>{this.state.launchDetails.net}</p>
          <h6>Location</h6>
          <p>{this.state.launchDetails.location}</p>
        </div>
      </div>
    );
  }
}

export default SingleLaunch;
