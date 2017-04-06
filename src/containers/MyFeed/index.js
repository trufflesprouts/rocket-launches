import React, { Component, PropTypes } from 'react'


class MyFeed extends Component {
  render() {
    return (
      <h1>my fedd</h1>
    )
  }
}

MyFeed.propTypes = {
  limit: PropTypes.number.isRequired
}

export default MyFeed
