import React, { Component } from 'react';
import Moment from 'react-moment';
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
                        <small className='mr-1'>
                            <Moment
                                format="YYYY/MM/DD">
                                {post.datePosted}
                            </Moment>
                        </small>
                        {
                            post.editDate ?
                                <small className='mr-1'>
                                    (edited
                                    <Moment format='YYYY/MM/DD'>
                                        {post.editDate}
                                    </Moment>)
                                </small>
                                :
                                false
                        }
                        <NavLink to={'/forums/' + post.topic + '/' + post._id}>{post.title}</NavLink>
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