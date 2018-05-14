import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../../../actions/fetch_user';
import { fetchUserPosts } from '../../../../actions/fetch_user_posts';
import ProfileNav from '../../main/profile_navigation';
import ProfileInfo from '../../main/profile_info';
import Activity from './activity';
import ProfileSidebar from '../../main/profile_sidebar';
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
                        <div className='container'>
                            <ProfileInfo user={user} />

                            <ProfileNav />

                            <Activity user={user} />
                        </div>
                }
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchUser, fetchUserPosts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
