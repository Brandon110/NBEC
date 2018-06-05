import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../../../actions/fetch_user';
import ProfileNav from '../../main/profile_navigation';
import ProfileInfo from '../../main/profile_info';
import Activity from './activity';
import '../../profile.css';

class ProfilePage extends Component {
    render() {
        let user = this.props.user;
        let posts = this.props.posts;

        return (
            <main>
                {
                    user.loading ?
                        false
                        :
                        <div className='container mb-5'>
                            <ProfileInfo user={user} />

                            <ProfileNav />

                            <Activity user={user} fetchUser={this.props.fetchUser}/>
                        </div>
                }
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
