import React, { Component, PropTypes } from 'react'
import ReactBodymovin from 'react-bodymovin'
import './LaunchGrid.css'

import LaunchBlock from '../LaunchBlock'
import SingleLaunch from '../SingleLaunch'
import spinner from '../../data/loader.json'

class LaunchGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detailsShown: false,
      detailsId: null,
      detailsAgency: null,
      detailsInitialPlacement: null
    }
  }

  showDetailsCard = (id, agency) => {
    this.setState({
      detailsShown: true,
      detailsId: id,
      detailsAgency: agency
    })
  }

  elementPlacement = (dimensions) => {
    this.setState({
      detailsInitialPlacement: dimensions
    })
  }

  render() {
    const bodymovinOptions = {
      loop: true,
      autoplay: true,
      prerender: true,
      animationData: spinner
    }
    return (
      <div className='LaunchGrid'>
        {this.state.detailsShown && <SingleLaunch id={this.state.detailsId} agency={this.state.detailsAgency} initialPlacement={this.state.detailsInitialPlacement}/>}
        {!this.props.loaded && this.props.searching && <ReactBodymovin options={bodymovinOptions}/>}
        {this.props.loaded && this.props.launches.map((launch, i) => (
          <LaunchBlock
            key={launch.id}
            id={launch.id}
            className={launch.agencyAbbrev}
            agencyAbbrev={launch.agencyAbbrev}
            agency={launch.agency}
            rocket={launch.rocket}
            name={launch.name}
            date={launch.date}
            showDetailsCard={this.showDetailsCard}
            elementPlacement={this.elementPlacement}
            />
        ))}
      </div>
    )
  }
}

LaunchGrid.propTypes = {
  loaded: PropTypes.bool.isRequired,
  launches: PropTypes.array
}

export default LaunchGrid
