import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alert from '../../alerts/no_data';
import AddComment from './main/add_comment';
import DisplayComments from './main/display_comments';
import ThreadReaction from './main/thread_reaction';
import Reactions from '../toggle_reactions';
import Moment from 'react-moment';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';

class Thread extends Component {
    constructor(props) {
        super(props);

        this.state = {
            thread: null
        }
    }

    componentDidMount() {
        this.fetchThread();
    }

    fetchThread() {
        this._isMounted = true;

        axios.get('/thread/' + this.props.match.params.id).then(function (response) {
            if (this._isMounted === true) {
                this.setState({ thread: response.data });
            }
        }.bind(this))
            .catch(err => {
                return err;
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    renderThread() {
        let thread = this.state.thread;
        let user = this.props.user;

        if (!thread) {
            return (
                <div className="fa-3x popup text-center">
                    <span><i className="fas fa-circle-notch fa-spin loader"></i></span>
                </div>
            )
        }
        else if (thread.status === 'error') {
            return <Alert msg='Oops! Something went wrong! This thread may no longer exist.' />
        }
        else {
            return (
                <div className='container mt-5'>

                    <h1 className='text-center mb-5'>{thread.title}</h1>

                    <div className='d-flex wrap-on-resize white-background border-right border-left border-bottom border-top-blue grey-shadow-bottom'>

                        <div className='d-flex flex-column align-items-center align-self-start center-on-resize p-2 mb-2' style={{ background: '#f2f2f2' }}>
                            <img className='profile-img mb-2' src={thread.author.profileImg} />
                            <div><NavLink to={'/live-profile/activity/' + thread.author.userId}>{thread.author.name}</NavLink></div>
                            <div>
                                <small className='text-muted'>
                                    Born <strong><Moment format='YYYY/MM/DD'>{thread.author.birthDate}</Moment></strong>
                                </small>
                            </div>
                            <div className='d-flex align-items-center justify-content-between p-1 mt-1'>
                                <small>
                                    {
                                        user && !user.loading ?
                                            <ThreadReaction
                                                id={thread._id}
                                                fetchThread={this.fetchThread.bind(this)}
                                                user={user}
                                                thread={thread} />
                                            :
                                            false
                                    }
                                </small>

                                <small><Reactions likes={thread.likes} /></small>
                            </div>
                        </div>

                        <div className='p-2'>
                            <div className='border-bottom mb-2'>
                                <NavLink to={'/live-profile/activity/' + thread.author.userId}>
                                    <small>{thread.author.name}, </small>
                                </NavLink>
                                <small>
                                    Posted {' '}
                                    <Moment
                                        format="YYYY/MM/DD">
                                        {thread.datePosted}
                                    </Moment>
                                </small>
                                {
                                    thread.editDate ?
                                        <small>
                                            {' '} (edited {' '}
                                            <Moment format='YYYY/MM/DD'>
                                                {thread.editDate}
                                            </Moment>)
                                        </small>
                                        :
                                        false
                                }
                            </div>
                            <article>{thread.body}</article>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <h5>Comments {thread.comments.length}</h5>
                        {
                            user && !user.loading ?
                                <AddComment
                                    thread={thread}
                                    id={thread._id}
                                    fetchThread={this.fetchThread.bind(this)}
                                />
                                :
                                <small>Please <NavLink to='/signin'>Sign in</NavLink> to comment</small>
                        }
                    </div>

                    <div className='mt-5 mb-5'>
                        <DisplayComments
                            thread={thread}
                            user={user}
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

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Thread);