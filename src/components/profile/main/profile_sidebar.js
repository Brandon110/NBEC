import React, { Component } from 'react';
import Parser from 'html-react-parser';

class ProfileSidebar extends Component {
    componentDidMount() {
        this.props.fetchUserPosts();
    }

    render() {
        let user = this.props.user;
        let posts = this.props.posts;

        return (
            <div className='p-2'>
                <span><strong>Forum Posts </strong>{posts.length}</span>
                <article className='mt-2'>{user.description && Parser(user.description)}</article>
            </div>
        )
    }
}


export default ProfileSidebar;