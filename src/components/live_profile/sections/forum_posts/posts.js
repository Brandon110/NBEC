import React, { Component } from 'react';

class ForumPosts extends Component {
    renderPosts() {
        let posts = this.props.posts;

        if (posts.length === 0) {
            return <li className='list-group-item'>No posts to show</li>
        }
        else {
            return posts.map((post, index) => {
                return <li key={index} className='list-group-item'>{post.title}</li>
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