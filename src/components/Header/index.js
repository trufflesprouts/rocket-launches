import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import h from '../../helpers';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItemsWidths: [],
    };
  }

  handleClick = currentPage => {
    this.props.setCurrentPage(h.pageRefConverter(currentPage));
  };

  componentDidMount() {
    this.calculateTranslateX();
  }

  calculateTranslateX = () => {
    let navItemsWidths = [];
    let headerChildren = Array.from(
      document.getElementById('header').childNodes,
    );
    headerChildren.forEach(child => {
      navItemsWidths.push(child.offsetWidth);
    });
    this.setState({
      navItemsWidths: navItemsWidths,
    });
  };

  render() {
    let currentPage = this.props.currentPage;
    let navTranslateX = 0;
    for (let i = 0; i < currentPage; i++) {
      navTranslateX += this.state.navItemsWidths[i] + 54;
    }
    return (
      <div className="Header">
        <header
          style={{ transform: `translateX(-${navTranslateX}px)` }}
          id="header"
        >
          <NavLink exact={true} to="/" onClick={() => this.handleClick('/')}>
            <h6>All Launches</h6>
          </NavLink>
          <NavLink to="/search" onClick={() => this.handleClick('/search')}>
            <h6>Search</h6>
          </NavLink>
          <NavLink to="/settings" onClick={() => this.handleClick('/settings')}>
            <h6>Settings</h6>
          </NavLink>
        </header>
        <div className="pagination">
          <NavLink exact={true} to="/" onClick={() => this.handleClick('/')} />
          <NavLink to="/search" onClick={() => this.handleClick('/search')} />
          <NavLink
            to="/settings"
            onClick={() => this.handleClick('/settings')}
          />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Header;
