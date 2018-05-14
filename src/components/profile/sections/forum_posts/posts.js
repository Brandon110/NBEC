import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class ForumsPosts extends Component {
    renderPosts() {
        let posts = this.props.posts;

        if (posts.loading) {
            return false;
        }
        else if (posts.length === 0) {
            return <li className='list-group-item'>No posts to show</li>
        }
        else {
            return posts.map((post, index) => {
                return <li key={index} className='list-group-item'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <small className='text-muted mr-1'>{post.datePosted} {post.editDate ? '(Edited ' + post.editDate + ')' : ''}</small>
                            <NavLink to={'/forums/' + post.topic + '/' + post._id}>{post.title}</NavLink>
                        </div>
                        <NavLink to={'/forums/edit-thread/' + post._id}>Edit</NavLink>
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

export default ForumsPosts;
