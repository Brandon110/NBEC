import React, { Component } from 'react';
import { connect } from 'react-redux';
import Parser from 'html-react-parser';
import Alert from '../../alerts/no_data';
import AddComment from './main/add_comment';
import DisplayComments from './main/display_comments';
import ThreadReaction from './main/thread_reaction';
import Reactions from '../toggle_reactions';
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
                <div className='container'>

                    <h1 className='text-center mb-5'>{thread.title}</h1>

                    <div className='d-flex flex-1 wrap-on-resize border white-background'>
                        <div className='mr-2'>
                            <div className='d-flex flex-column align-items-center p-2' style={{ background: '#f2f2f2' }}>
                                <img className='profile-img' src={thread.author.profileImg} />
                                <div><NavLink to={'/live-profile/activity/' + thread.author.userId}>{thread.author.name}</NavLink></div>
                                <div><small className='text-muted'>Born <strong>{thread.author.birthDate}</strong></small></div>
                                <div><small className='text-muted'>Posted <strong>{thread.datePosted}</strong></small></div>
                                {
                                    thread.editDate ?
                                        <div><small className='text-muted'><strong>{'(Edited ' + thread.editDate + ')'}</strong></small></div>
                                        :
                                        false
                                }
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
                        </div>
                        <section className='p-1'>
                            {Parser(thread.body)}
                        </section>
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