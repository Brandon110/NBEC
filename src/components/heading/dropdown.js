import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';

class DropdownHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDropDown: false
        }
    }

    toggleDropDown() {
        let showDropDown = this.state.showDropDown;

        if (showDropDown === true) {
            this.setState({ showDropDown: false });
        }
        else {
            this.setState({ showDropDown: true });
        }
    }

    handleClickOutside() {
        this.setState({ showDropDown: false });
    }

    renderDropdownMenu() {
        let user = this.props.user;

        if (user.loading) {
            return false;
        }
        else if (user) {
            return <li className='list-group-item'>
                <NavLink to='/profile/activity' activeClassName='active'>{user.firstName + ' ' + user.lastName}</NavLink>
            </li>
        }
        else {
            return <li className='list-group-item'>
                <NavLink to='/signup' activeClassName='active'>Join</NavLink>/<NavLink to='/signin'>Sign in</NavLink>
            </li>
        }
    }


    render() {
        return (
            <nav className='dropdown-nav'>
                <div className='d-flex justify-content-between align-items-center'>
                    <a href='/' className='header-title ml-3'>NBEC <i className="fab fa-envira"></i></a>
                    <button
                        onClick={this.toggleDropDown.bind(this)}
                        className='mr-3 dropdown-icon transparent-btn'>
                        &#9776;
            </button>
                </div>

                {
                    this.state.showDropDown === true ?
                        <ul className='list-group text-center'>
                            <li className='list-group-item'><NavLink exact to='/'>Home</NavLink></li>
                            {this.renderDropdownMenu()}
                            <li className='list-group-item'><NavLink to='/newsletter'>Newsletter</NavLink></li>
                            <li className='list-group-item'><NavLink to='/forums'>Forums</NavLink></li>
                            <li className='list-group-item'><NavLink to='/news'>News</NavLink></li>
                        </ul>
                        :
                        false
                }
            </nav>
        )
    }
}

export default onClickOutside(DropdownHeader);