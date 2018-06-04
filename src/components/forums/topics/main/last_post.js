import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class LastPost extends Component {
    renderLastPost() {
        let posts = this.props.posts;

        if (!posts) {
            return (
                <div className='text-center'>
                    <span><i className="fas fa-circle-notch fa-spin loader"></i></span>
                </div>
            )
        }
        else if (posts.length === 0) {
            return <small>No posts</small>
        }
        else {
            let post = posts[0];

            return <div>
                <div><NavLink to={'/live-profile/activity/' + post.author.userId}>{post.author.name}</NavLink></div>
                <div><small><NavLink to={'/forums/' + post.topic + '/' + post._id}>{post.title}</NavLink></small></div>
                <div><small className='text-muted'>{post.datePosted}</small></div>
            </div>
        }
    }

    render() {
        return this.renderLastPost();
    }
}

export default LastPost;