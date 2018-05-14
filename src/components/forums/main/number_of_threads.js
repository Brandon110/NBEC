import React, { Component } from 'react';

class NumberOfThreads extends Component {
    render() {
        let posts = this.props.posts;

        return <div><small>threads {posts.length}</small></div>
    }
}

export default NumberOfThreads;