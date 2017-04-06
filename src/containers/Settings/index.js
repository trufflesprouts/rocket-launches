import React, { Component, PropTypes } from 'react'


class Settings extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <h1>settts</h1>
      </div>
    )
  }
}

Settings.propTypes = {
  limit: PropTypes.number.isRequired
}

export default Settings
