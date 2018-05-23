import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../actions/fetch_user';
import MainHeader from './main';
import Dropdown from './dropdown';
import './header.css';

class Header extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        let user = this.props.user;

        return (
            <header className='white-background mb-3'>
                <MainHeader user={user} />

                <Dropdown user={user} />
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header);
