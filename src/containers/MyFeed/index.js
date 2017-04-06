import React, { Component, PropTypes } from 'react'

class MyFeed extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <h1>MA Feeed</h1>
      </div>
    )
  }
}

MyFeed.propTypes = {
  limit: PropTypes.number.isRequired
}

export default MyFeed
