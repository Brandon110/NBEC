import React, { Component } from 'react';
import LastPost from './main/last_post';
import NumberOfThreads from './main/number_of_threads';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';

class Forestry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts() {
        this._isMounted = true;

        axios.get('/posts/forestry').then(function (response) {
            if (this._isMounted === true) {
                this.setState({ posts: response.data });
            }
        }.bind(this))
            .catch(err => {
                return err;
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let posts = this.state.posts;

        return (
            <div className='d-flex text-center white-background'>
                <div className='w-100 border d-flex flex-column justify-content-center'>
                    <NavLink to='/forums/forestry'>Forestry</NavLink>
                    <div><small className='text-muted'>Discussions relating to Forestry</small></div>
                </div>

                <div className='w-25 border d-flex flex-column justify-content-center hide-on-resize'>
                    <NumberOfThreads posts={posts} />
                </div>

                <div className='w-25 border d-flex flex-column justify-content-center hide-on-resize'>
                    <LastPost posts={posts} />
                </div>
            </div>
        )
    }
}

export default Forestry;