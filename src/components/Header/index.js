import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Header extends Component {
  handleClick = (currentPage) => {
    this.props.setCurrentPage(currentPage)
  }

  render() {
    return (
      <header>
        <NavLink exact={true} to="/">All Launches</NavLink>
        <NavLink to="/my-feed">My Feed</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </header>
    )
  }
}

export default Header
