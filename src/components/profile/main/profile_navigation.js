import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class ProfileNavigation extends Component {
    render() {
        return <nav className='d-flex align-items-center mt-2 mb-2 profile-header'>
            <NavLink className='header-link ml-3' exact to='/profile/activity' activeClassName='active'>Activity</NavLink>
            <NavLink className='header-link' to='/profile/posts' activeClassName='active'>Forum Posts</NavLink>
            <NavLink className='header-link' to='/profile/update-profile' activeClassName='active'>Settings</NavLink>
        </nav>
    }
}

export default ProfileNavigation;