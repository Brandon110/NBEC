import React, { Component } from 'react';
import CommentReaction from './comment_reaction';
import Reactions from '../../toggle_reactions';
import Moment from 'react-moment';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';

class DisplayComments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: null,
            editedComment: ''
        }
    }

    editComment(index, text) {
        this.setState({ activeIndex: index, editedComment: text });
    }

    onChange(e) {
        this.setState({ editedComment: e.target.value });
    }

    handleSubmit(e, comment) {
        e.preventDefault();
        const thread = this.props.thread;
        const editedComment = this.state.editedComment;

        axios.post('/activity/edit-comment', {
            threadId: thread._id,
            commentId: comment._id,
            editedComment: editedComment
        })
            .then(response => {
                this.props.fetchThread();
                this.cancelEdit();
            })
            .catch(err => {
                return err;
            });
    }

    removeComment(commentId) {
        let thread = this.props.thread;
        let user = this.props.user;

        axios.post('/activity/remove-comment', {
            threadId: thread._id,
            commentId: commentId,
            fullName: user.fullName,
            userId: user.userId
        })
            .then(response => {
                if (response.data.status === 'success') {
                    this.props.fetchThread();
                }
            })
            .catch(err => {
                return err;
            });
    }

    cancelEdit() {
        this.setState({ activeIndex: null });
    }

    render() {
        let thread = this.props.thread;
        let user = this.props.user;
        let activeIndex = this.state.activeIndex;

        return thread.comments.length > 0 ?
            <ul className='list-group'>
                {
                    thread.comments.map((comment, index) => {
                        return <li key={index} className='list-group-item d-flex p-0 m-0 align-items-center mb-4 wrap-on-resize border-top-blue grey-shadow-bottom'>

                            <div className='d-flex flex-column align-items-center align-self-start p-1 mr-2 h-100' style={{ flexShrink: '0', background: '#f2f2f2' }}>
                                <NavLink to={'/live-profile/activity/' + comment.userId}>
                                    <small>{comment.name}</small>
                                </NavLink>
                                <small className='text-muted'>
                                    <Moment format='YYYY/MM/DD'>
                                        {comment.date}
                                    </Moment>
                                </small>

                                <div className='d-flex align-items-center'>
                                    <small className='text-muted'>
                                        {
                                            user && !user.laoding ?
                                                <CommentReaction
                                                    thread={thread}
                                                    user={user}
                                                    comment={comment}
                                                    fetchThread={this.props.fetchThread}
                                                />
                                                :
                                                false
                                        }
                                    </small>

                                    <small><Reactions likes={comment.likes} /></small>
                                </div>

                                {
                                    user.userId === comment.userId ?
                                        <div className='d-flex align-items-center'>
                                            <button
                                                className='transparent-btn'
                                                onClick={() => this.removeComment(comment._id)}>
                                                <small>Delete</small>
                                            </button>

                                            <button
                                                className='transparent-btn'
                                                onClick={() => this.editComment(index, comment.text)}>
                                                <small>Edit</small>
                                            </button>
                                        </div>
                                        :
                                        false
                                }
                            </div>
                            {
                                index === activeIndex ?
                                    <form onSubmit={(e) => this.handleSubmit(e, comment)} className='w-100 p-3'>
                                        <textarea
                                            type='text'
                                            onChange={this.onChange.bind(this)}
                                            className='form-control'
                                            name='editedComment'
                                            value={this.state.editedComment}>
                                        </textarea>
                                        <button className='mr-2 mt-2 main-btn' type='submit'>Save</button>
                                        <button className='main-btn' onClick={this.cancelEdit.bind(this)}>Cancel</button>
                                    </form>
                                    :
                                    <article className='p-3'>{comment.text}</article>
                            }
                        </li>
                    })
                }
            </ul>
            :
            false
    }
}

export default DisplayComments;