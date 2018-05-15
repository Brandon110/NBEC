import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class MainHeader extends Component {   
    renderMainHeaderMenu() {
        let user = this.props.user;

        if (user.loading) {
            return false;
        }
        else if (user) {
            return <div className='mr-5 d-flex'>
                <NavLink to='/profile/activity' activeClassName='active'>{user.firstName + ' ' + user.lastName}</NavLink>
            </div>
        }
        else {
            return <div className='mr-5'>
                <NavLink to='/signup' activeClassName='active'>Join</NavLink>/<NavLink to='/signin'>Sign in</NavLink>
            </div>
        }
    }
     
    render() {
        return (
            <nav className='main-nav'>
                <div className='d-flex align-items-center justify-content-between grey-shadow-bottom p-2 list-unstyled'>
                    <div className='ml-5'>
                        <a href='/' className='header-title'>NBEC <i className="fab fa-envira"></i></a>
                    </div>
                    {this.renderMainHeaderMenu()}
                </div>

                <div className='d-flex grey-shadow-bottom list-unstyled p-2'>
                    <div>
                        <NavLink exact to='/' className='header-link ml-5' activeClassName='active'>Home</NavLink>
                    </div>
                    <div>
                        <NavLink className='header-link' activeClassName='active' to='/newsletter'>Newsletter</NavLink>
                    </div>
                    <div>
                        <NavLink className='header-link' activeClassName='active' to='/forums'>Forums</NavLink>
                    </div>
                    <div>
                        <NavLink className='header-link' activeClassName='active' to='/news'>News</NavLink>
                    </div>
                </div>
            </nav>
        )
    }
}

export default MainHeader;