import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../../actions/fetch_user';
import Parser from 'html-react-parser';
import Alert from '../../alerts/no_data';
import AddComment from '../comments/add_comment';
import DisplayComments from '../comments/display_comments';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';

class Thread extends Component {
    constructor(props) {
        super(props);

        this.state = {
            thread: null,
            threadAuthor: null
        }
    }

    componentDidMount() {
        this.fetchThread();
    }

    fetchThread() {
        axios.get('/thread/' + this.props.match.params.id).then(function (response) {
            this.setState({ thread: response.data }, () => {
                ;
                if (this.state.thread.status !== 'error') {
                    this.fetchUser()
                }
            });
        }.bind(this))
            .catch(err => {
                return err;
            });
    }

    fetchUser() {
        let thread = this.state.thread;

        axios.get('/profile/live/' + thread.author.userId).then(function (response) {
            this.setState({ threadAuthor: response.data });
        }.bind(this))
            .catch(err => {
                return err;
            });
    }

    renderThread() {
        let thread = this.state.thread;
        let threadAuthor = this.state.threadAuthor;
        let user = this.props.user;

        if (!thread) {
            return false;
        }
        else if (thread.status === 'error') {
            return <Alert msg='Oops! Something went wrong! This thread may no longer exist.' />
        }
        else {
            return (
                <div className='container'>

                    <h1 className='text-center'>{thread.title}</h1>

                    <div className='d-flex flex-1 wrap-on-resize border white-background'>
                        {
                            threadAuthor ?
                                <div className='mr-2'>
                                    <div className='d-flex flex-column align-items-center p-1' style={{background: '#f2f2f2'}}>
                                    <img className='profile-img' src={threadAuthor.profileImg} />
                                    <div><NavLink to={'/live-profile/activity/' + threadAuthor.userId}>{threadAuthor.firstName + ' ' + threadAuthor.lastName}</NavLink></div>
                                    <div><small className='text-muted'>Born <strong>{threadAuthor.birthDate}</strong></small></div>
                                    <div><small className='text-muted'>Posted <strong>{thread.datePosted}</strong></small></div>
                                    <div className='d-flex mt-1'>
                                        <small className='mr-2'>Likes {thread.likes.length}</small>
                                        <small>Replies {thread.comments.length}</small>
                                    </div>
                                    </div>
                                </div>
                                :
                                false
                        }
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
                                    fetchThread={this.fetchThread.bind(this)}
                                />
                                :
                                <small>Please <NavLink to='/signin'>Sign in</NavLink> to comment</small>
                        }
                    </div>

                    <div className='mt-5 mb-5'>
                        <DisplayComments
                            comments={thread.comments}
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