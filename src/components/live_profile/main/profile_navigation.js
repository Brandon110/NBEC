import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class LiveProfileNavigation extends Component {
    render() {
        let user = this.props.user;

        return <nav className='d-flex align-items-center mt-2 mb-2 profile-header'>
            <NavLink
                className='ml-3 header-link'
                exact to={'/live-profile/activity/' + user.userId}
                activeClassName='active'>
                Activity
          </NavLink>
            <NavLink
                className='header-link'
                to={'/live-profile/posts/' + user.userId}
                activeClassName='active'>
                Forum Posts
          </NavLink>
        </nav>
    }
}

export default LiveProfileNavigation;