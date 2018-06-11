import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class MainHeader extends Component {
    renderMainHeaderMenu() {
        let user = this.props.user;

        if (user.loading) {
            return false;
        }
        else if (user) {
            return <div className='d-flex'>
                <NavLink
                    to='/profile/activity'
                    className='mr-3'
                    activeClassName='active'>
                    {user.fullName}
                </NavLink>
                <a href='/signout'>
                    <i className="fas fa-sign-out-alt"></i>
                </a>
            </div>
        }
        else {
            return <div>
                <NavLink to='/signup' activeClassName='active'>Join</NavLink>/<NavLink to='/signin'>Sign in</NavLink>
            </div>
        }
    }

    render() {
        return (
            <nav className='main-nav'>
                <div className='border-bottom p-2'>
                    <div className='container d-flex align-items-center justify-content-between'>
                        <div>
                            <a href='/' className='header-title'><img src='/images/logo2.png' /></a>
                        </div>
                        {this.renderMainHeaderMenu()}
                    </div>
                </div>

                <div className='grey-shadow-bottom p-2'>
                    <div className='container d-flex align-items-center'>
                        <div>
                            <NavLink exact to='/' className='header-link' activeClassName='active'>Home</NavLink>
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
                </div>
            </nav>
        )
    }
}

export default MainHeader;