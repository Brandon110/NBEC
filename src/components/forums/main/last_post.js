import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class LastPost extends Component {
    render() {
        let post = this.props.posts;

        return post ?
            <div>
                <div><NavLink to={'/live-profile/activity/' + post.author.userId}>{post.author.firstName}</NavLink></div>
                <div><small><NavLink to={'/forums/' + post.topic + '/' + post._id}>{post.title}</NavLink></small></div>
                <div><small className='text-muted'>{post.datePosted}</small></div>
            </div>
            :
            <small>No posts</small>
    }
}

export default LastPost;