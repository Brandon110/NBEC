import React, { Component } from 'react';
import Parser from 'html-react-parser';
import Alert from '../../alerts/no_data';
import AddComment from '../comments/add_comment';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';

class Thread extends Component {
    constructor(props) {
        super(props);

        this.state = {
            thread: null,
            user: null
        }
    }

    componentDidMount() {
        this.fetchThread();
    }

    fetchThread() {
        axios.get('/thread/' + this.props.match.params.id).then(function (response) {
            this.setState({ thread: response.data }, () => this.fetchUser());
        }.bind(this))
            .catch(err => {
                return err;
            });
    }

    fetchUser() {
        let thread = this.state.thread;

        axios.get('/profile/live/' + thread.author.userId).then(function (response) {
            this.setState({ user: response.data });
        }.bind(this))
            .catch(err => {
                return err;
            });
    }

    renderThread() {
        let thread = this.state.thread;
        let user = this.state.user;

        if (!thread || !user) {
            return false;
        }
        else if (thread.status === 'error') {
            return <Alert msg='Oops! Something went wrong! This thread may no longer exist.' />
        }
        else {
            return (
                <div className='container'>

                    <h1 className='text-center'>{thread.title}</h1>

                    <div className='d-flex white-background flex-1 p-1 thread-wrapper border'>

                        <div className='d-flex flex-column align-items-center mr-2'>
                            <img className='profile-img' src={user.profileImg} />
                            <div><NavLink to={'/live-profile/activity/' + user.userId}>{user.firstName + ' ' + user.lastName}</NavLink></div>
                            <div><small className='text-muted'>Born <strong>{user.birthDate}</strong></small></div>
                            <div><small className='text-muted'>Posted <strong>{thread.datePosted}</strong></small></div>
                            <div className='d-flex mt-1'>
                                <small className='mr-2'>Likes {thread.likes.length}</small>
                                <small>Replies {thread.comments.length}</small>
                            </div>
                        </div>

                        <div className='d-flex flex-column align-items-center'>
                            {Parser(thread.body)}
                        </div>
                    </div>

                    <div className='mt-5'>
                        <h5>Comments {thread.comments.length}</h5>
                        <AddComment 
                        thread={thread} 
                        fetchThread={this.fetchThread.bind(this)}
                        />
                    </div>
                </div>

            )
        }
    }

    render() {
        return (
            <main>
                {this.renderThread()}
            </main>
        )
    }
}

export default Thread;
