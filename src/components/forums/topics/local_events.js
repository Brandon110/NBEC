import React, { Component } from 'react';
import axios from 'axios';
import LastPost from '../main/last_post';
import NumberOfThreads from '../main/number_of_threads';
import { NavLink, Link } from 'react-router-dom';

class LocalEvents extends Component {
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

        axios.get('/posts/local-events').then(function (response) {
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
                    <NavLink to='/forums/local-events'>Local Events</NavLink>
                    <div><small className='text-muted'>Discussions relating to environemntal events in NB</small></div>
                </div>

                <div className='w-100 border d-flex flex-column justify-content-center'>
                    <NumberOfThreads posts={posts} />
                </div>

                <div className='w-100 border d-flex flex-column justify-content-center'>
                    <LastPost posts={posts[0]} />
                </div>
            </div>
        )
    }
}

export default LocalEvents;