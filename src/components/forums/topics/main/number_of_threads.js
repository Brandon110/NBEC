import React, { Component } from 'react';

class NumberOfThreads extends Component {
    renderNumberOfThreads() {
        let posts = this.props.posts;

        if (!posts) {
            return <div className='text-center'>
                <span><i className="fas fa-circle-notch fa-spin loader"></i></span>
            </div>
        }
        else {
            return <div><small>threads {posts.length}</small></div>
        }
    }

    render() {
        return this.renderNumberOfThreads();
    }
}

export default NumberOfThreads;