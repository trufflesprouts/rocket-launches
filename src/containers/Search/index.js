import React, { Component, PropTypes } from 'react'


class Search extends Component {
  render() {
    return (
      <h1>Seachs</h1>
    )
  }
}

Search.propTypes = {
  limit: PropTypes.number.isRequired
}

export default Search
