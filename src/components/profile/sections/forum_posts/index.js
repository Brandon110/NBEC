import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserPosts } from '../../../../actions/fetch_user_posts';
import { fetchUser } from '../../../../actions/fetch_user';
import Posts from './posts';
import ProfileNav from '../../main/profile_navigation';
import ProfileInfo from '../../main/profile_info';
import axios from 'axios';

class ProfilePostsPage extends Component {
    componentDidMount() {
        this.props.fetchUserPosts();
        this.props.fetchUser();
    }

    render() {
        let posts = this.props.posts;
        let user = this.props.user;

        return (
            <main>
                {
                    posts.loading || user.loading ?
                        false
                        :
                        <div className='container mb-5'>
                            <ProfileInfo user={user} />

                            <ProfileNav />

                            <Posts posts={posts} />
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
    return bindActionCreators({ fetchUserPosts, fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePostsPage);