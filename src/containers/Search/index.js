import React, { Component, PropTypes } from 'react'


class Search extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <h1>Seachs</h1>
      </div>
    )
  }
}

Search.propTypes = {
  limit: PropTypes.number.isRequired
}

export default Search
