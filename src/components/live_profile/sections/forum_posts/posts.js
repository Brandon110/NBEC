import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class ForumPosts extends Component {
    renderPosts() {
        let posts = this.props.posts;

        if (posts.length === 0) {
            return <li className='list-group-item'>No posts to show</li>
        }
        else {
            return posts.map((post, index) => {
                return <li key={index} className='list-group-item'>
                    <div className='d-flex align-items-center'>
                            <small className='text-muted mr-1'>{post.datePosted} {post.editDate ? '(Edited ' + post.editDate + ')' : ''}</small>
                            <NavLink to={'/forums/' + post.topic + '/' + post._id}>{post.title}</NavLink>
                    </div>
                </li>
            })
        }
    }

    render() {
        return (
            <ul className='list-group'>
                {this.renderPosts()}
            </ul>
        )
    }
}

export default ForumPosts;